/**
 * Created by Artem.Malieiev on 7/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        ConnectionListItemViewTemplate = require('text!template/ConnectionListItemViewTemplate.html');

    return Backbone.View.extend({
        className: 'connections-list-item-view',
        tagName: 'li',
        template: _.template(ConnectionListItemViewTemplate),
        events: {
            'click span': 'onConnectionClick'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        onConnectionClick: function () {
            console.log(this.model)
        }
    });
});