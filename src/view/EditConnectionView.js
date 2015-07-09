/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        EditConnectionViewTemplate = require('text!template/EditConnectionViewTemplate.html');

    return Backbone.View.extend({
        className: 'edit-connection',
        template: EditConnectionViewTemplate,
        events: {
            'click .connect': 'onConnectClick'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template);
            this.calculateHeight();
            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                var bodyHeight = $('body').height();

                this.$el.height(bodyHeight - 40);
            }.bind(this), 0);
        },
        onConnectClick: function (event) {
            var values = _.reduce(this.$('form').serializeArray(), function (memo, value) {
                memo[value.name] = value.value;
                return memo;
            }, {});

            this.remove();

            console.log('connect clicked', values);
        }
    });
});