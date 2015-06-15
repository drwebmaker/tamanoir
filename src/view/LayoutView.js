/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        SidebarView = require('view/SidebarView'),
        LayoutViewTemplate = require('text!template/LayoutViewTemplate.html');

    require('css!bower_components/foundation/css/foundation.css');
    require('css!bower_components/foundation/css/foundation.css');
    require('css!styles/base');
    require('css!styles/layout');

    require('foundation');

    return Backbone.View.extend({
        initialize: function () {
            this.sidebar = new SidebarView();
        },
        render: function () {
            this.$el.html(LayoutViewTemplate);
            this.$el.find('.off-canvas-wrap .inner-wrap').append(this.sidebar.render().$el);
            this.calculateHeight();
            $(document).foundation();
            return this;
        },
        calculateHeight: function () {
            $('.main-section').height($(document).height() - $('.tab-bar').height());
        }
    });
});