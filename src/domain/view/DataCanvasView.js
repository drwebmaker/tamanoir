/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        JoinTypeWidgetView = require('domain/view/JoinTypeWidgetView');

    return Backbone.View.extend({

        className: 'data-canvas-view',
        events: {
            'dragover': 'onDragOver',
            'drop': 'onDrop'
        },

        initialize: function (options) {
            this._subviews = [];

            this.listenTo(Tamanoir, 'dragstart:sidebarTable', this.onSidebarTableDragStart);
            this.listenTo(this.collection, 'update reset', this.render);

            this.render();
        },

        render: function () {

            //TODO: replace with vis.js
            this.$el.empty();
            this.collection.each(function (tableModel) {
                this.$el.append(tableModel.get('name') + ' ');
            }, this);

            return this;
        },

        onDragOver: function (event) {
            event.preventDefault();
        },

        onDrop: function (event) {
            console.log('drop:sidebarTable');
            this.collection.add(this.draggedTableModel);
        },

        onSidebarTableDragStart: function (tableModel) {
            this.draggedTableModel = tableModel;
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});

