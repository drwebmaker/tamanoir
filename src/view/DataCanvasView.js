/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        TableSettingsView = require('view/TableSettingsView'),
        DataCanvasViewTemplate = require('text!template/DataCanvasViewTemplate.html'),
        DataCanvasItemView = require('view/DataCanvasItemView');

    return Backbone.View.extend({
        className: 'data-canvas-view',
        template: DataCanvasViewTemplate,
        events: {
            'dragover': 'onDragOver',
            'drop': 'onDrop'
        },
        initialize: function () {
            this.listenTo(Tamanoir, 'tables:table:dragstart', this.onSidebarTableDragStart);
            this.listenTo(Tamanoir, 'datacanvasitem:table:click', this.onDataCanvasItemClick);
            this.listenTo(this.collection, 'update', this.render);
            this.listenTo(this.collection, 'reset', this.render);

            this.render();
        },
        render: function () {
            this.$el.html(this.template);
            this.collection.each(this.addItem, this);

            this.calculateHeight();
            return this;
        },
        addItem: function (model) {
            console.log('add canvas item', model);

            this.$('.canvas-items-holder').append(new DataCanvasItemView({model: model}).$el);
            this.$('.table-settings-holder').html(new TableSettingsView({model: model}).$el);

            return this;
        },
        serialize: function () {
            return this.collection.serialize();
        },
        calculateHeight: function () {
            setTimeout(function () {
                console.log('data canvas rendered');
                this.$el.height(this.$el.parents('.top-section').height());
            }.bind(this), 0);
        },
        onDragOver: function (event) {
            event.preventDefault();
        },
        onDrop: function (event) {
            console.log('drop', this.draggedTableModel);
            this.collection.add(this.draggedTableModel.toJSON());
        },
        onSidebarTableDragStart: function (table) {
            console.log('dragstart', table);
            this.draggedTableModel = table;
        },
        onDataCanvasItemClick: function (table) {
            console.log('canvas item clicked', table);
            this.$('.table-settings-holder').html(new TableSettingsView({model: table}).$el);
        }
    });
});