/**
 * Created by Artem.Malieiev on 6/12/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        SidebarViewTemplate = require('text!template/SidebarViewTemplate.html');

    require('css!styles/sidebar');

    return Backbone.View.extend({
        tagName: 'aside',
        className: 'left-off-canvas-menu',
        render: function () {
            this.$el.html(SidebarViewTemplate);
            return this;
        }
    });
});