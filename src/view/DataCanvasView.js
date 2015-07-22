/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        jsPlumb = require('jsplumb'),
        DataCanvasItemModel = require('model/DataCanvasItemModel'),
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
            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html(this.template);
            this.collection.each(this.addItem, this);

            this.calculateHeight();
            return this;
        },
        addItem: function (model, index) {
            console.log('add canvas item', model);

            var itemView = new DataCanvasItemView({model: model});

            this._subviews.push(itemView);

            this.$('.canvas-items-holder').append(itemView.$el);

            itemView.drawRelation();

            return this;
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
            Tamanoir.connecion.getColumns(this.draggedTableModel.get('name')).then(function (columns) {
                this.collection.add(_.extend(this.draggedTableModel.toJSON(), {
                    columns: _.map(columns, function (value) { return value.name; }),
                    position: {top: event.originalEvent.offsetY, left: event.originalEvent.offsetX}
                }));
            }.bind(this));
        },
        onSidebarTableDragStart: function (table) {
            console.log('dragstart', table);
            this.draggedTableModel = table;
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});