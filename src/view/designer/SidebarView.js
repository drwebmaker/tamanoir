/**
 * Created by Artem.Malieiev on 6/12/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        SidebarViewTemplate = require('text!template/designer/SidebarViewTemplate.html');

    require('css!styles/designer/sidebar');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(SidebarViewTemplate);
            return this;
        }
    });
});