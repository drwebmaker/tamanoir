/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        TableViewTemplate = require('text!template/TableViewTemplate.html');

    return Backbone.View.extend({
        className: 'table-view',
        template: _.template(TableViewTemplate),
        events: {
        },
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.calculateHeight();

            this.$el.html(this.template({
                data: this.collection.toJSON()
            }));

            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                this.$el.height($('.bottom-section').height());
            }.bind(this), 0);
        }
    });
});