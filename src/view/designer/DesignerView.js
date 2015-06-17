/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        ToolbarView = require('view/designer/ToolbarView'),
        SidebarView = require('view/designer/SidebarView'),
        CanvasView = require('view/designer/CanvasView'),
        TableView = require('view/preview/TableView'),
        c3 = require('c3'),
        QueryResultsCollection = require('collection/QueryResultsCollection'),
        DesignerViewTemplate = require('text!template/designer/DesignerViewTemplate.html');

    require('css!styles/designer/designer');
    require('css!bower_components/c3/c3');

    return Backbone.View.extend({
        initialize: function () {
            this.sidebar = new SidebarView();
            this.toolbar = new ToolbarView();
            this.canvas = new CanvasView();

            this.tableView = new TableView({
                collection: QueryResultsCollection
            });

            this.listenTo(this.toolbar, 'change:type', this.onTypeChange);
        },
        render: function () {
            this.$el.html(DesignerViewTemplate);
            this.$el.find('.sidebar-holder').html(this.sidebar.render().$el);
            this.$el.find('.toolbar-holder').html(this.toolbar.render().$el);
            this.$el.find('.canvas-holder').html(this.canvas.render().$el);

            this.$el.find('.canvas').append(this.tableView.render().$el);
            return this;
        },
        onTypeChange: function (event) {
            c3.generate({
                bindto: '.canvas',
                data: {
                    columns: QueryResultsCollection.getDataForC3(),
                    type: $(event.target).data('chart-type')
                }
            });
        }
    });
});