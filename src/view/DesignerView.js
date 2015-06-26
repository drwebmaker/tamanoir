/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        SidebarView = require('view/SidebarView'),
        TableView = require('view/TableView'),
        CanvasView = require('view/CanvasView'),
        ToolbarModel = require('model/ToolbarModel'),
        c3 = require('c3'),
        QueryExecuter = require('util/QueryExecuter'),
        MetadataExplorer = require('util/MetadataExplorer'),
        QueryResultsCollection = require('collection/QueryResultsCollection'),
        MetadataResultsCollection = require('collection/MetadataResultsCollection'),
        DomainsCollection = require('collection/DomainsCollection'),
        DesignerViewTemplate = require('text!template/DesignerViewTemplate.html');

    require('css!styles/designer');
    require('css!bower_components/c3/c3');

    return Backbone.View.extend({
        events: {
            'click .foundicon-remove': 'onRemoveColumnClick',
            'click .foundicon-paper-clip': 'onPaperClipClick'
        },
        initialize: function (config) {
            ToolbarModel.set('state', 'designer');
            this.domain = config.domain;
            this.tableName = config.tableName;
            this.queryExecuter = new QueryExecuter(this.domain);
            this.metadataExplorer = new MetadataExplorer(this.domain);
            this.metadataResultsCollection = new MetadataResultsCollection();
            this.queryResultsCollection = new QueryResultsCollection();

            this.sidebar = new SidebarView({collection: this.metadataResultsCollection});
            this.canvas = new CanvasView();
            this.table = new TableView({
                collection: this.queryResultsCollection,
                metadataCollection: this.metadataResultsCollection
            });

            this.fetchData();
            this.render();
        },
        render: function () {
            this.$el.html(DesignerViewTemplate);
            this.$el.find('.sidebar-holder').html(this.sidebar.render().$el);
            this.$el.find('.canvas-holder').html(this.canvas.render().$el);
            this.$el.find('.canvas').html(this.table.render().$el);
            return this;
        },

        onRemoveColumnClick: function () {
            console.log('onRemoveColumnClick');
        },

        onPaperClipClick: function (event) {
            console.log('onPaperClipClick');
            var reference = $(event.target).data('referenceTo');

            this.originColumnName = $(event.target).parent().text().trim();
            this.originTableName = this.tableName;
            this.foreignTableName = reference.slice(0, reference.lastIndexOf('.'));
            this.foreignColumnName = reference.slice(reference.lastIndexOf('.') + 1);

            this.metadataExplorer.getMetaData(this.foreignTableName).then(_.bind(this.onMetadataLoaded, this));

        },

        onMetadataLoaded: function (metadata) {
            var originTableName = this.originTableName;
            var foreignTableName = this.foreignTableName;
            var originColumns = _.map(this.metadataResultsCollection.toJSON(), function (value) {
                return originTableName + '.' + value.name;
            });
            var foreignColumns = _.map(metadata, function (value) {
                return foreignTableName + '.' + value.name;
            });
            var columns = originColumns.concat(foreignColumns);
            var query = 'SELECT {columns} FROM {originTableName} INNER JOIN {foreignTableName} ON {originTableName}.{originColumnName}={foreignTableName}.{foreignColumnName}'
                .replace(/{columns}/g, columns.join(','))
                .replace(/{originTableName}/g, this.originTableName)
                .replace(/{foreignTableName}/g, this.foreignTableName)
                .replace(/{originColumnName}/g, this.originColumnName)
                .replace(/{foreignColumnName}/g, this.foreignColumnName);

            this.metadataResultsCollection.add(metadata);
            this.queryExecuter.query(query).then(_.bind(this.onDataLoaded, this));
        },
        onDataLoaded: function (data) {
            this.queryResultsCollection.add(data);
        },

        fetchData: function () {
            this.metadataExplorer.getMetaData(this.tableName).then(_.bind(function (metadata) {
                console.log(metadata);
                this.metadataResultsCollection.add(metadata);
            }, this));
            this.queryExecuter.query(this.tableName ? 'select * from ' + this.tableName : 'select *').then(_.bind(function (data) {
                console.log(data);
                this.queryResultsCollection.add(data);
            }, this));
        },

        onTypeChange: function (event) {
            var type = $(event.target).text();
            if (type === 'table') {
                this.$el.find('.canvas').html(this.table.render().$el);
            } else {
                c3.generate({
                    bindto: '.canvas',
                    data: {
                        columns: this.queryResultsCollection.getDataForC3(),
                        type: type
                    }
                });
            }
        }
    });
});