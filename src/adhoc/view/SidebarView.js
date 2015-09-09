/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        SidebarViewTemplate = require('text!adhoc/template/SidebarViewTemplate.html'),
        ColumnView = require('adhoc/view/ColumnView');

    return Backbone.View.extend({

        template: _.template(SidebarViewTemplate),
        className: 'sidebar-view',

        events: {
        },

        initialize: function () {
            this._subviews = [];

            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        addColumn: function (columnModel) {
            var columnView = new ColumnView({model: columnModel});

            this.$el.append(columnView.$el);
            this._subviews.push(v);
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});