/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ErrorViewTemplate = require('text!template/ErrorViewTemplate.html');

    require('css!styles/error');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(ErrorViewTemplate);
            return this;
        }
    });
});