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
        TableModel = require('model/TableModel'),
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
                model: new TableModel({
                    domain: config.domain
                })
            });
            this.table.load(config.tableName);

            this.render();
        },
        render: function () {
            this.$el.html(DesignerViewTemplate);
            this.$el.find('.sidebar-holder').html(this.sidebar.render().$el);
            this.$el.find('.canvas-holder').html(this.canvas.render().$el);
            this.$el.find('.canvas').html(this.table.$el);
            return this;
        },

        onRemoveColumnClick: function () {
            console.log('onRemoveColumnClick');
        },

        onPaperClipClick: function (event) {
            console.log('onPaperClipClick');
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