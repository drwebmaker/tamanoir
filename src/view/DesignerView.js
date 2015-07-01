/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        SidebarView = require('view/SidebarView'),
        TableView = require('view/TableView'),
        ToolbarModel = require('model/ToolbarModel'),
        TableModel = require('model/TableModel'),
        c3 = require('c3'),
        QueryExecuter = require('util/QueryExecuter'),
        MetadataExplorer = require('util/MetadataExplorer'),
        ColumnsCollection = require('collection/ColumnsCollection'),
        //MetadataResultsCollection = require('collection/MetadataResultsCollection'),
        DomainsCollection = require('collection/DomainsCollection'),
        DesignerViewTemplate = require('text!template/DesignerViewTemplate.html');

    require('css!styles/designer');
    require('css!bower_components/c3/c3');

    return Backbone.View.extend({
        events: {
            'dragstart table th': 'onDragStart',
            'dragover .chart-holder': 'onDragOver',
            'drop .chart-holder': 'onDrop'
        },
        initialize: function (config) {
            ToolbarModel.set('state', 'designer');
            this.domain = config.domain;
            this.tableName = config.tableName;
            this.queryExecuter = new QueryExecuter(this.domain);
            this.metadataExplorer = new MetadataExplorer(this.domain);
            this.columnsCollection = new ColumnsCollection();

            this.sidebar = new SidebarView({collection: this.columnsCollection});
            this.table = new TableView({
                columnsCollection: this.columnsCollection,
                model: new TableModel({
                    domain: config.domain
                })
            });
            this.table.load(config.tableName);
            this.listenTo(this.table.model, 'loaded', this.onTableLoaded);
            this.listenTo(Tamanoir, 'toolbar:addchart', this.onAddChartClick);

            this.render();
        },
        render: function () {
            this.$el.html(DesignerViewTemplate);
            this.$el.find('.sidebar-holder').html(this.sidebar.render().$el);
            this.$el.find('.table-holder').html(this.table.$el);
            return this;
        },

        onDragStart: function (event) {
            var data = this.table.model.get('data'),
                columnName = $(event.target).data('name'),
                c3data = _.map(data, function (value) {
                    return value[columnName];
                });

            c3data.unshift(columnName);

            this._c3data = c3data;
        },

        onDragOver: function (event) {
            event.preventDefault();
        },

        onDrop: function (event) {
            event.preventDefault();
            this.chart.load({
                columns: [this._c3data]
            });
        },

        onTableLoaded: function (tableModel) {
            var tableData = tableModel.toJSON(),
                result = _.map(tableData.data[0], function (value, key) {
                    return tableData.metadata[key];
                });

            this.columnsCollection.reset(result);
        },

        onAddChartClick: function () {
            console.log('add chart');
            this.chart = c3.generate({
                bindto: '.chart-holder',
                data: {
                    columns: []
                }
            });
        }
    });
});