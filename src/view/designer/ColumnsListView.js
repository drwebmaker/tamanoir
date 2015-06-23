/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    require('css!styles/component/list');

    var ColumnListItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'columnName',
        template: '{{- name }}',
        events: {
            'click': 'onColumnClick'
        },
        render: function () {
            this.$el.html(_.template(this.template)(this.model.toJSON()));
            return this;
        },
        onColumnClick: function () {
            this.trigger('column:click', this.model);
            this.$el.toggleClass('selected');
        }
    });

    return Backbone.View.extend({
        tagName: 'ul',
        className: 'list columnsList',
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html('');
            this.collection.each(this.addItem, this);
            return this;
        },
        addItem: function (model) {
            var columnView = new ColumnListItemView({model: model});
            this.$el.append(columnView.render().$el);
            this.listenTo(columnView, 'column:click', this.onColumnClick);
            return this;
        },
        onColumnClick: function (model) {
            this.trigger('column:click', model);
        }
    });
});