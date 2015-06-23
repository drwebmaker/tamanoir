/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    require('css!styles/component/list');

    var SchemaListItemView = Backbone.View.extend({
        tagName: 'li',
        template: '{{- name }}',
        events: {
            'click': 'onSchemaClick'
        },
        render: function () {
            this.$el.html(_.template(this.template)(this.model.toJSON()));
            return this;
        },
        onSchemaClick: function () {
            this.trigger('schema:click', this.model);
        }
    });

    return Backbone.View.extend({
        tagName: 'ul',
        className: 'list schemasList',
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html('');
            this.collection.each(this.addItem, this);
            return this;
        },
        addItem: function (model) {
            var schemaView = new SchemaListItemView({model: model});
            this.$el.append(schemaView.render().$el);
            this.listenTo(schemaView, 'schema:click', this.onSchemaClick);
            return this;
        },
        onSchemaClick: function (model) {
            this.trigger('schema:click', model);
        }
    });
});