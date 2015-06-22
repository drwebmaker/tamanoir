/**
 * Created by Artem.Malieiev on 6/12/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        CanvasViewTemplate = require('text!template/designer/CanvasViewTemplate.html');

    require('css!styles/designer/canvas');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(CanvasViewTemplate);
            return this;
        }
    });
});