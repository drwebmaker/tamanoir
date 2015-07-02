/**
 * Created by Artem.Malieiev on 7/2/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        SidebarItemViewTemplate = require('text!template/SidebarItemViewTemplate.html');

    return Backbone.View.extend({
        tagName: 'li',
        className: 'sidebarItem',
        template: _.template(SidebarItemViewTemplate),
        events: {
            'change input': 'onCheckboxChange'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        onCheckboxChange: function (event) {
            this.model.toggleHidden();
        }
    });
});