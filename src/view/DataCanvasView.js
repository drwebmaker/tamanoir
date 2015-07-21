/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        jsPlumb = require('jsplumb'),
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
            this._subviews = [];

            this.listenTo(Tamanoir, 'tables:table:dragstart', this.onSidebarTableDragStart);
            this.listenTo(Tamanoir, 'datacanvasitem:table:click', this.onDataCanvasItemClick);
            this.listenTo(this.collection, 'update', this.render);
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html(this.template);
            this.collection.each(this.addItem, this);

            this.calculateHeight();
            this.drawRelations();
            return this;
        },
        addItem: function (model, index) {
            console.log('add canvas item', model);

            var itemView = new DataCanvasItemView({model: model});

            this._subviews.push(itemView);

            this.$('.canvas-items-holder').append(itemView.$el);

            return this;
        },
        drawRelations: function () {
            setTimeout(function () {
                console.log('jsPlumb');
            }.bind(this), 0);
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
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});