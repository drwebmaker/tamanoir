/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        SidebarViewTemplate = require('text!template/SidebarViewTemplate.html');

    require('css!styles/sidebar');

    return Backbone.View.extend({
        events: {
            'click li': 'onItemClick'
        },
        initialize: function () {
            this.listenTo(this.collection, 'add', this.render);
        },
        render: function () {
            this.$el.html(_.template(SidebarViewTemplate)({
                categories: this.collection.getCategories(),
                numbers: this.collection.getNumbers()
            }));
            return this;
        },

        onItemClick: function (event) {
            console.log('sidebar item click');
        }
    });
});