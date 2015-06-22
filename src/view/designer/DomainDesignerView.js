/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        MetadataExplorer = require('util/MetadataExplorer'),
        SchemasListView = require('view/designer/SchemasListView'),
        TablesListView = require('view/designer/TablesListView'),
        ColumnsListView = require('view/designer/ColumnsListView'),
        MetadataResultsCollection = require('collection/MetadataResultsCollection'),
        DialogView = require('view/component/DialogView');

    return Backbone.View.extend({
        initialize: function (config) {
            config = config || {};
            this.initialConfig = config;

            this.state = {
                schema: '',
                table: '',
                columns: []
            };

            this.domain = config.domain;
            this.metadataExplorer = new MetadataExplorer(config.domain);

            this.metadataResultsCollection = new MetadataResultsCollection();

            this.metadataExplorer.getMetaData().then(_.bind(this.onMetadataLoaded, this));

            this.dialog = new DialogView({
                title: 'Domain designer',
                buttons: [{
                    label: 'Ok',
                    action: 'ok'
                }]
            });
        },
        render: function () {
            this.dialog.render();
        },
        onMetadataLoaded: function (data) {
            switch (this.domain.get('type')) {
                case 'jdbc':
                    this.onSchemasLoaded(data);
                    break;
                case 'csv':
                    this.onColumnsLoaded(data);
                    break;
            }
        },
        onSchemasLoaded: function (data) {
            this.schemasList = new SchemasListView({collection: this.metadataResultsCollection});
            this.metadataResultsCollection.reset(data);
            this.dialog.setContent(this.schemasList.render().$el);
            this.listenTo(this.schemasList, 'schema:click', this.onSchemaClick);
        },
        onTablesLoaded: function (data) {
            this.tablesList = new TablesListView({collection: this.metadataResultsCollection});
            this.metadataResultsCollection.reset(data);
            this.dialog.setContent(this.tablesList.render().$el);
            this.listenTo(this.tablesList, 'table:click', this.onTableClick);
        },
        onColumnsLoaded: function (data) {
            this.columnsList = new ColumnsListView({collection: this.metadataResultsCollection});
            this.metadataResultsCollection.reset(data);
            this.dialog.setContent(this.columnsList.render().$el);
            this.listenTo(this.columnsList, 'column:click', this.onColumnClick);
        },
        onSchemaClick: function (model) {
            this.state.schema = model.get('name');
            this.metadataExplorer.getMetaData(this.state.schema).then(_.bind(this.onTablesLoaded, this));
        },
        onTableClick: function (model) {
            this.state.table = model.get('name');
            this.metadataExplorer.getMetaData(this.state.schema + '.' + this.state.table).then(_.bind(this.onColumnsLoaded, this));
        },
        onColumnClick: function (model) {
            console.log('column click', model);
        }
    });
});