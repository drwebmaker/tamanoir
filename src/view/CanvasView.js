/**
 * Created by Artem.Malieiev on 6/12/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        CanvasViewTemplate = require('text!template/CanvasViewTemplate.html');

    require('css!styles/canvas');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(CanvasViewTemplate);
            return this;
        }
    });
});