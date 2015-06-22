/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    require('css!styles/component/list');

    return Backbone.View.extend({
        tagName: 'ul',
        className: 'list',
        initialize: function (config) {
            config = config || {};
            this.itemClass = config.itemClass || Backbone.View;

            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html('');
            this.collection.each(this.addItem, this);
            return this;
        },
        addItem: function (model) {
            this.$el.append(new this.itemClass({model: model}).render().$el);
            return this;
        }
    });
});