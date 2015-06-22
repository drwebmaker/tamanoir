/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        ToolbarView = require('view/designer/ToolbarView'),
        SidebarView = require('view/designer/SidebarView'),
        CanvasView = require('view/designer/CanvasView'),
        c3 = require('c3'),
        QueryExecuter = require('util/QueryExecuter'),
        DomainsCollection = require('collection/DomainsCollection'),
        DesignerViewTemplate = require('text!template/designer/DesignerViewTemplate.html');

    require('css!styles/designer/designer');
    require('css!bower_components/c3/c3');

    return Backbone.View.extend({
        initialize: function (config) {
            config = config || {};

            this.initialConfig = config;

            this.nativeQuery = '';
            this.queryExecuter = null;

            this.sidebar = new SidebarView();
            this.toolbar = new ToolbarView();
            this.canvas = new CanvasView();

            this.domainsCollection = new DomainsCollection();
            this.domainsCollection.fetch({reset: true});

            this.listenTo(this.domainsCollection, 'sync', this.onDomainsLoaded);
        },
        render: function () {
            this.$el.html(DesignerViewTemplate);
            this.$el.find('.sidebar-holder').html(this.sidebar.render().$el);
            this.$el.find('.toolbar-holder').html(this.toolbar.render().$el);
            this.$el.find('.canvas-holder').html(this.canvas.render().$el);
            return this;
        },

        onDomainsLoaded: function () {
            var domain = this.domainsCollection.find(_.bind(function (domain) {
                return domain.get('name') === this.initialConfig.domain;
            }, this));

            this.nativeQuery = domain.get('nativeQuery');

            if (this.nativeQuery) {
                this.queryExecuter = new QueryExecuter(domain);
            } else {
                console.log('todo: implement query builder');
            }
        }
    });
});