/**
 * Created by Artem.Malieiev on 7/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        GroupView = require('view/GroupView'),
        GroupsViewTemplate = require('text!template/GroupsViewTemplate.html');

    return Backbone.View.extend({
        className: 'groups-view',
        template: _.template(GroupsViewTemplate),
        initialize: function () {
            this._subviews = [];

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.render);

            this.render();
        },
        render: function () {
            this.$el.html(this.template());
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function (model) {
            var view = new GroupView({model: model});
            this._subviews.push(view);
            this.$('ul').append(view.$el);
            return this;
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});