/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        HomeViewTemplate = require('text!template/HomeViewTemplate.html');

    require('css!styles/home');

    return Backbone.View.extend({
        className: 'home',
        render: function () {
            this.$el.html(HomeViewTemplate);
            return this;
        }
    });
});