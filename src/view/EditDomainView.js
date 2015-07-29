/**
 * Created by Artem.Malieiev on 6/23/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        EditDomainViewTemplate = require('text!template/EditDomainViewTemplate.html');

    return Backbone.View.extend({
        className: 'edit-domain',
        events: {
            'click .save': 'onSaveClick'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(_.template(EditDomainViewTemplate)(this.model.toJSON()));
            this.calculateHeight();
            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                var bodyHeight = $('body').height();

                this.$el.height(bodyHeight - 40);
            }.bind(this), 0);
        },
        onSaveClick: function () {
            var values = _.reduce(this.$('form').serializeArray(), function (memo, value) {
                memo[value.name] = value.value;
                return memo;
            }, {});

            this.remove();

            this.model.save(values);
        }
    });
});