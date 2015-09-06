/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        JoinTypeWidgetView = require('domainDesigner/view/JoinTypeWidgetView');

    return Backbone.View.extend({
        className: 'data-canvas-view',
        events: {
            'dragover': 'onDragOver',
            'drop': 'onDrop'
        },
        initialize: function (options) {
            this._subviews = [];
        },
        render: function () {
            this.$el.html("data canvas");
            return this;
        },
        onDragOver: function (event) {
            event.preventDefault();
        },
        onDrop: function (event) {
            console.log('drop:table');
        },
        onSidebarTableDragStart: function (table) {
            console.log('dragstart:table');
            this.draggedTableModel = table;
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});

