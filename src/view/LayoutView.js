/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        LayoutViewTemplate = require('text!template/LayoutViewTemplate.html');

    require('css!styles/base');
    require('css!styles/layout');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(LayoutViewTemplate);
            return this;
        }
    });
});