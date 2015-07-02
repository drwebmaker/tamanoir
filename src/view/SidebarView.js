/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        SidebarItemView = require('view/SidebarItemView'),
        SidebarViewTemplate = require('text!template/SidebarViewTemplate.html');

    require('css!styles/sidebar');

    return Backbone.View.extend({
        tagName: 'ul',
        className: 'sidebar',
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            //this.$el.html(_.template(SidebarViewTemplate)({
            //    categories: this.collection.getCategories(),
            //    numbers: this.collection.getNumbers()
            //}));
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function (model) {
            this.$el.append(new SidebarItemView({model: model}).$el);
            return this;
        }
    });
});