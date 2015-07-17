/**
 * Created by Artem.Malieiev on 7/14/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        AxisViewTemplate = require('text!template/AxisViewTemplate.html');

    return Backbone.View.extend({
        className: 'axis-view',
        template: _.template(AxisViewTemplate),
        events: {
        },
        initialize: function () {
            this._subviews = [];

            this.render();
        },
        render: function () {
            this.$el.html(this.template());

            this.calculateHeight();

            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {

            }.bind(this), 0);
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});