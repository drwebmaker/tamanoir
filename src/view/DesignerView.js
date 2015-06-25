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
        QueryResultsCollection = require('collection/QueryResultsCollection'),
        DomainsCollection = require('collection/DomainsCollection'),
        DesignerViewTemplate = require('text!template/DesignerViewTemplate.html');

    require('css!styles/designer');
    require('css!bower_components/c3/c3');

    return Backbone.View.extend({
        initialize: function () {
            ToolbarModel.set('state', 'designer');
            this.queryExecuter = new QueryExecuter(this.model.get('domain'));
            this.columnsCollection = new QueryResultsCollection();
            this.queryResultsCollection = new QueryResultsCollection();

            this.sidebar = new SidebarView({collection: this.columnsCollection});
            this.canvas = new CanvasView();
            this.table = new TableView({collection: this.queryResultsCollection});


            var query;
            if (this.model.get('schemaName')) {
                query = 'select * from ' + this.model.get('schemaName') + '.' + this.model.get('tableName') + ' limit 20';
            } else {
                query = 'select * limit 20';
            }
            this.queryExecuter.query(query).then(_.bind(function (data) {
                this.columnsCollection.reset(data);
                this.queryResultsCollection.reset(data);
            }, this));
        },
        render: function () {
            $('.main-header li.graph').show();//TODO: remove this hack
            $('.main-header li.graph li').bind('click', _.bind(this.onTypeChange, this));
            this.$el.html(DesignerViewTemplate);
            this.$el.find('.sidebar-holder').html(this.sidebar.render().$el);
            this.$el.find('.canvas-holder').html(this.canvas.render().$el);
            this.$el.find('.canvas').html(this.table.render().$el);
            this.calculateCanvasHeight();
            return this;
        },

        calculateCanvasHeight: function () {
            this.$el.find('.canvas-holder').height($('body').height() - 85);
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