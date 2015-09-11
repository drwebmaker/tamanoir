/**
 * Created by valeriy.abornyev on 9/8/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ConnectionView = require('domain/view/ConnectionView'),
        TableModel = require('domain/model/TableModel'),
        TablesCollection = require('domain/collection/TablesCollection'),
        RightSidebarColumnsView = require('domain/view/RightSidebarColumnsView'),
        RightSidebarViewTemplate = require('text!domain/template/RightSidebarViewTemplate.html');

    return Backbone.View.extend({
        className: 'right-sidebar-view',

        events: {
            'click .remove-right-sidebar': 'closeRightSidebar'
        },

        template: _.template(RightSidebarViewTemplate),

        initialize: function() {
            this._subview = [];
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            var view = new RightSidebarColumnsView({model: this.model});

            this._subview.push(view);
            this.$('.right-content').append(view.render().$el);

            this.$el.height($('.data-canvas-view').height() - 1);
            this.$('.right-content').height(this.$el.height() - $('.title').height());
            $('.right-sidebar-container').addClass('active');

            return this;
        },

        closeRightSidebar:function() {
            $('.right-sidebar-container').removeClass('active');
        }
    })
});

