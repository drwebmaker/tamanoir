/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    require('css!styles/component/list');

    var TableListItemView = Backbone.View.extend({
        tagName: 'li',
        template: '{{- name }}',
        events: {
            'click': 'onTableClick'
        },
        render: function () {
            this.$el.html(_.template(this.template)(this.model.toJSON()));
            return this;
        },
        onTableClick: function () {
            this.trigger('table:click', this.model);
        }
    });

    return Backbone.View.extend({
        tagName: 'ul',
        className: 'list tablesList',
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html('');
            this.collection.each(this.addItem, this);
            return this;
        },
        addItem: function (model) {
            var tableView = new TableListItemView({model: model});
            this.$el.append(tableView.render().$el);
            this.listenTo(tableView, 'table:click', this.onTableClick);
            return this;
        },
        onTableClick: function (model) {
            this.trigger('table:click', model);
        }
    });
});