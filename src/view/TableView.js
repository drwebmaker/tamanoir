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
            this.render();
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
                this.$('.inner').height($('.bottom-section').height() - 30);
            }.bind(this), 0);
        }
    });
});