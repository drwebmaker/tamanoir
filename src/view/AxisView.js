/**
 * Created by Artem.Malieiev on 7/14/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        AxisItemView = require('view/AxisItemView'),
        AxisItemModel = require('model/AxisItemModel'),
        AxisViewTemplate = require('text!template/AxisViewTemplate.html');

    return Backbone.View.extend({
        className: 'axis-view',
        template: _.template(AxisViewTemplate),
        events: {
            'dragover [class$=holder]': 'onHolderDragOver',
            'drop .rows-holder': 'onRowsHolderDrop',
            'drop .columns-holder': 'onColumnsHolderDrop'
        },
        initialize: function () {
            this._subviews = [];

            this.listenTo(Tamanoir, 'table:header:dragstart', this.onTableHeaderDragStart);

            this.render();
        },
        render: function () {
            this.$el.html(this.template());

            this.calculateHeight();

            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {

            }.bind(this), 0);
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        },
        onHolderDragOver: function (event) {
            event.preventDefault();
        },
        onRowsHolderDrop: function (event) {
            console.log('drop', this.draggedData.name);
            this.draggedData.axis = 'y';
            var view = new AxisItemView({model: new AxisItemModel(this.draggedData)})
            this._subviews.push(view);
            this.$('.rows-holder').append(view.$el);
            Tamanoir.trigger('axis:row:drop', this.draggedData.name, this.draggedData.data);
        },
        onColumnsHolderDrop: function (event) {
            console.log('drop', this.draggedData.name);
            this.draggedData.axis = 'x';
            var view = new AxisItemView({model: new AxisItemModel(this.draggedData)});
            this._subviews.push(view);
            this.$('.columns-holder').append(view.$el);
            Tamanoir.trigger('axis:column:drop', this.draggedData.name, this.draggedData.data);
        },
        onTableHeaderDragStart: function (name, data) {
            this.draggedData = {name: name, data: data};
        }
    });
});