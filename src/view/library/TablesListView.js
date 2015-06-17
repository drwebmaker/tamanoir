/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        TablesListViewTemplate = require('text!template/library/TablesListViewTemplate.html'),
        DatabaseExplorer = require('util/DatabaseExplorer');

    require('css!styles/library/tables');

    return Backbone.View.extend({
        tableTemplate: '<li data-name="{{- name }}">{{- name }}</li>',
        events: {
            'click li': 'onTableClick'
        },
        initialize: function (config) {
            this.connectionModel = config.connectionModel;
            this.schemaName = config.schemaName;
            this.databaseExplorer = new DatabaseExplorer(this.connectionModel.toJSON());
            this.collection = new Backbone.Collection();

            this.listenTo(this.collection, 'add', this.render);

            this.databaseExplorer.loadTables(this.schemaName).then(_.bind(this.onLoadTablesComplete, this));
        },
        render: function () {
            this.$el.html(TablesListViewTemplate);
            this.collection.each(this.addTable, this);
            return this;
        },
        addTable: function (tableModel) {
            this.$el.find('ul').append(_.template(this.tableTemplate)(tableModel.toJSON()));
        },
        onTableClick: function (event) {
            var connectionName = this.connectionModel.get('name'),
                schemaName = this.schemaName,
                tableName = $(event.target).data('name');
            Tamanoir.router.navigate('preview/{connectionName}/{schemaName}/{tableName}'
                .replace('{connectionName}', connectionName)
                .replace('{schemaName}', schemaName)
                .replace('{tableName}', tableName), {trigger: true});
        },
        onLoadTablesComplete: function (data) {
            this.collection.add(data.items);
        }
    });
});