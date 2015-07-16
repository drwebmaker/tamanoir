/**
 * Created by Artem.Malieiev on 7/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        GroupViewTemplate = require('text!template/GroupViewTemplate.html');

    return Backbone.View.extend({
        className: 'group-view',
        tagName: 'li',
        template: _.template(GroupViewTemplate),
        events: {
            'click .remove': 'onRemoveClick'
        },
        initialize: function () {
            this._subviews = [];

            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        onRemoveClick: function () {
            this.model.destroy();
            this.remove();
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});