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
        RightSidebarViewTemplate = require('text!domain/template/RightSidebarViewTemplate.html');

    return Backbone.View.extend({
        className: 'right-sidebar-view',

        template: _.template(RightSidebarViewTemplate),

        render: function() {
            //this.$el.empty();
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.height($('.data-canvas-view').height() - 1);
            $('.right-sidebar-container').addClass('active');
            return this;
        }
    })
});