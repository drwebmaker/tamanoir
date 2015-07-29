/**
 * Created by Artem.Malieiev on 7/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        FilterView = require('view/FilterView'),
        FiltersViewTemplate = require('text!template/FiltersViewTemplate.html');

    return Backbone.View.extend({
        className: 'filters-view',
        initialize: function () {
            this._subviews = [];

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.render);

            this.render();
        },
        render: function () {
            this.$el.html(_.template(FiltersViewTemplate)());
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function (model) {
            var view = new FilterView({model: model});
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