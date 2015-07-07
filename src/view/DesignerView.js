/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        SidebarView = require('view/SidebarView'),
        TableView = require('view/TableView'),
        TableModel = require('model/TableModel'),
        ChartView = require('view/ChartView'),
        c3 = require('c3'),
        QueryExecuter = require('util/QueryExecuter'),
        EditColumnView = require('view/EditColumnView'),
        MetadataExplorer = require('util/MetadataExplorer'),
        ColumnsCollection = require('collection/ColumnsCollection'),
        DomainsCollection = require('collection/DomainsCollection'),
        DesignerViewTemplate = require('text!template/DesignerViewTemplate.html');

    return Backbone.View.extend({
        events: {
            'dragstart table th': 'onDragStart',
            'dragover .chart-holder': 'onDragOver',
            'click .header .foundicon-graph': 'onAddChartClick'
        },
        initialize: function (config) {
            this.domain = config.domain;
            this.tableName = config.tableName;
            //assign queryExecuter and metadata explorer to Tamanoir just for debug.
            Tamanoir.queryExecuter = this.queryExecuter = new QueryExecuter(this.domain);
            Tamanoir.metadataExplorer = this.metadataExplorer = new MetadataExplorer(this.domain);
            this.columnsCollection = new ColumnsCollection();

            this.sidebar = new SidebarView({collection: this.columnsCollection});
            this.table = new TableView({
                model: new TableModel({
                    domain: config.domain,
                    metadata: this.columnsCollection
                })
            });
            this.table.load(config.tableName);
            this.listenTo(this.sidebar, 'click:join', this.onReferenceClick);
            this.listenTo(this.table.model, 'loaded', this.onModelDataLoaded);
            this.listenTo(Tamanoir, 'column:settings:click', this.onColumnSettingsClick);

            this.render();
        },
        render: function () {
            this.$el.html(DesignerViewTemplate);
            this.$el.find('.sidebar-holder').html(this.sidebar.$el);
            this.$el.find('.table-holder').html(this.table.$el);
            return this;
        },

        onModelDataLoaded: function() {
            this.sidebar.render();
        },

        onDragStart: function (event) {
            var data = this.table.model.get('data'),
                columnName = $(event.target).data('name'),
                c3data = _.map(data, function (value) {
                    return value[columnName];
                });

            c3data.unshift(columnName);

            if ($.isNumeric(c3data[1])) {
                this._c3data = c3data;
            } else {
                this._c3categories = c3data;
            }
        },

        onDragOver: function (event) {
            event.preventDefault();
        },

        onReferenceClick: function (model) {
            var foreignKey = model.get('referenceTo'),
                originTable = model.get('belongTo'),
                originKey = originTable + '.' + model.get('name'),
                foreignTable = foreignKey.slice(0, foreignKey.lastIndexOf('.'));

            this.table.model.join(originTable, foreignTable, originKey, foreignKey);
        },

        onColumnSettingsClick: function (model) {
            var editColumnView = new EditColumnView({model: model});
            this.$('.column-settings-holder').html(editColumnView.$el);
        },

        onAddChartClick: function () {
            var chartView = new ChartView();

            this.listenTo(chartView, 'drop', function(view) {
                if (this._c3categories && this._c3data) {

                    view.chart = c3.generate({
                        bindto: '.' + view.cid + ' .chart-holder',
                        data: {
                            x: this._c3categories[0],
                            columns: [
                                this._c3categories,
                                this._c3data
                            ]
                        },
                        axis: {
                            x: {
                                type: 'category'
                            }
                        }
                    });

                    this._c3categories = null;
                    this._c3data = null;

                } else {
                    view.chart.load({
                        columns: [this._c3data]
                    });
                }
            }.bind(this));
        }
    });
});