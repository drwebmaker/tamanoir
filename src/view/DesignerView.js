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
        DomainsCollection = require('collection/DomainsCollection'),
        DesignerViewTemplate = require('text!template/DesignerViewTemplate.html');

    require('css!styles/designer');
    require('css!bower_components/c3/c3');

    return Backbone.View.extend({
        events: {
            'click .foundicon-remove': 'onRemoveColumnClick',
            'click .foundicon-paper-clip': 'onRemovePaperClipClick'
        },
        initialize: function (config) {
            ToolbarModel.set('state', 'designer');
            this.domain = config.domain;
            this.tableName = config.tableName;
            this.queryExecuter = new QueryExecuter(this.domain);
            this.metadataExplorer = new MetadataExplorer(this.domain);
            this.columnsCollection = new QueryResultsCollection();
            this.queryResultsCollection = new QueryResultsCollection();

            this.sidebar = new SidebarView({collection: this.columnsCollection});
            this.canvas = new CanvasView();
            this.table = new TableView({collection: this.queryResultsCollection});

            this.fetchData();
            this.fetchMetadata();

            this.render();
        },
        render: function () {
            this.$el.html(DesignerViewTemplate);
            this.$el.find('.sidebar-holder').html(this.sidebar.render().$el);
            this.$el.find('.canvas-holder').html(this.canvas.render().$el);
            this.$el.find('.canvas').html(this.table.render().$el);
            this.calculateCanvasHeight();
            return this;
        },

        calculateCanvasHeight: function () {
            this.$el.find('.canvas-holder').height($('body').height() - 45);
        },

        onRemoveColumnClick: function () {
            console.log('onRemoveColumnClick');
        },

        onRemovePaperClipClick: function () {
            console.log('onRemovePaperClipClick');
        },

        fetchMetadata: function () {
            this.metadataExplorer.getMetaData(this.tableName).then(_.bind(function (data) {
                this.columnsCollection.add(data);
            }, this));
        },

        fetchData: function () {
            if (this.tableName) {
                this.queryExecuter.query('select * from ' + this.tableName).then(_.bind(function (data) {
                    this.queryResultsCollection.add(data);
                }, this));
            } else {
                this.queryExecuter.query('select *').then(_.bind(function (data) {
                    this.queryResultsCollection.add(data);
                }, this));
            }
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