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
        className: 'sidebar',
        template: SidebarViewTemplate,
        events: {
            'click .foundicon-paper-clip': 'onPaperClipClick'
        },
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template);

            _.each(this.collection.getNumbers(), this.addNumber, this);
            _.each(this.collection.getCategories(), this.addCategory, this);

            return this;
        },

        addCategory: function (model) {
            this.$('.categories-holder ul').append(new SidebarItemView({model: model}).$el);
        },

        addNumber: function (model) {
            this.$('.numbers-holder ul').append(new SidebarItemView({model: model}).$el);
        },

        onPaperClipClick: function (event) {
            var name = $(event.target).parent().text().trim();
            this.trigger('click:join', this.collection.get(name));
        }
    });
});