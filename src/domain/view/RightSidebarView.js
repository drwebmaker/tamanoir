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
        RightSidebarColumnsItemView = require('domain/view/RightSidebarColumnsItemView'),
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
            var model = this.model.toJSON();
            this.$el.html(this.template(model));
            this.$el.height($('.data-canvas-view').height() - 1);
            $('.right-sidebar-container').addClass('active');
            this.addColumns(model);
            return this;
        },

        closeRightSidebar:function() {
            $('.right-sidebar-container').removeClass('active');
        },

        addColumns: function(items) {
            var view = new RightSidebarColumnsItemView({ model: items });
            this._subview.push(view);
            this.$('.right-content').append(view.render().$el);
        }
    })
});