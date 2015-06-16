/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ToolbarView = require('view/designer/ToolbarView'),
        SidebarView = require('view/designer/SidebarView'),
        //CanvasView = require('view/designer/CanvasView'),
        DesignerViewTemplate = require('text!template/designer/DesignerViewTemplate.html');

    require('css!styles/designer/designer');

    return Backbone.View.extend({
        initialize: function () {
            this.sidebar = new SidebarView();
            this.toolbar = new ToolbarView();
            //this.canvas = new CanvasView();
        },
        render: function () {
            this.$el.html(DesignerViewTemplate);
            this.$el.find('.sidebar-holder').html(this.sidebar.render().$el);
            this.$el.find('.toolbar-holder').html(this.toolbar.render().$el);
            //this.$el.find('#canvas').append(this.canvas.render().$el);
            return this;
        }
    });
});