/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        jsPlumb = require('jsplumb'),
        DataCanvasItemModel = require('model/DataCanvasItemModel'),
        JoinTypeWidgetView = require('view/JoinTypeWidgetView'),
        DataCanvasViewTemplate = require('text!template/DataCanvasViewTemplate.html'),
        DataCanvasItemView = require('view/DataCanvasItemView');

    return Backbone.View.extend({
        className: 'data-canvas-view',
        template: DataCanvasViewTemplate,
        events: {
            'dragover': 'onDragOver',
            'drop': 'onDrop'
        },
        initialize: function (options) {
            this._subviews = [];

            this.initialItemPosition =  {top: 50, left: 50};

            this.connection = options.connection;

            this.listenTo(Tamanoir, 'tables:table:dragstart', this.onSidebarTableDragStart);
            this.listenTo(Tamanoir, 'DataCanvasSuggestedItem:click', this.onSuggestedClick);
            this.listenTo(Tamanoir, 'onPlus:click', this.onPlusClick);
            this.listenTo(this.collection, 'remove', this.onRemove);
            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html(this.template);

            this.plumbInstance = jsPlumb.getInstance();

            this.collection.each(this.resetMetadata, this);
            this.collection.each(this.addItem, this);

            this.calculateHeight();
            return this;
        },
        resetMetadata: function (model) {
            model.set({
                availablePlace: {top: true, bottom: true, left: true, right: true},
                placedTo: null,
                position: {top: 0, left: 0}
            });
        },
        addItem: function (model, index) {
            console.log('add canvas item', model);

            var itemView = new DataCanvasItemView({model: model}),
                tableName = model.get('name'),
                tableAvailablePlace = model.get('availablePlace'),
                relatedTableName = this.active && this.active.get('name'),
                relatedTable = this.collection.get(relatedTableName),
                relation,
                sourceColumnName,
                relatedTablePosition,
                relatedTableAvailablePlace,
                anchors;

            this._subviews.push(itemView);

            this.$el.append(itemView.$el);

            if (relatedTable) {
                relation = this.active.getRelationForTable(tableName),
                sourceColumnName = relation.sourceColumnName;
                relatedTablePosition = relatedTable.get('position');
                relatedTableAvailablePlace = relatedTable.get('availablePlace');

                model.set({
                    sourceColumnName: sourceColumnName,
                    sourceColumn: relation.sourceColumnName,
                    sourceTable: relation.sourceTableName,
                    targetColumn: relation.targetColumnName,
                    targetTable: relation.targetTableName
                }, {silent: true});

                if (relatedTableAvailablePlace.right) {
                    anchors = ['Right', 'Left'];
                    relatedTableAvailablePlace.right = false;
                    tableAvailablePlace.left = false;

                    model.set({
                        position: {
                            top: relatedTablePosition.top,
                            left: relatedTablePosition.left + 300
                        },
                        availablePlace: tableAvailablePlace,
                        placedTo: 'right'
                    }, {silent: true});

                    relatedTable.set({
                        availablePlace: relatedTableAvailablePlace
                    }, {silent: true});

                    itemView.$el.css(model.get('position'));
                } else if (relatedTableAvailablePlace.bottom) {
                    anchors = ['Bottom', 'Top'];
                    relatedTableAvailablePlace.bottom = false;
                    tableAvailablePlace.top = false;

                    model.set({
                        position: {
                            top: relatedTablePosition.top + 100,
                            left: relatedTablePosition.left
                        },
                        availablePlace: tableAvailablePlace,
                        placedTo: 'bottom'
                    }, {silent: true});

                    relatedTable.set({
                        availablePlace: relatedTableAvailablePlace
                    }, {silent: true});

                    itemView.$el.css(model.get('position'));
                } else if (relatedTableAvailablePlace.left) {
                    anchors = ['Left', 'Right'];
                    relatedTableAvailablePlace.left = false;
                    tableAvailablePlace.right = false;

                    if ((relatedTablePosition.left - 300) < 0) {
                        this.initialItemPosition.left += 300;
                        this.render();
                        return;
                    }

                    model.set({
                        position: {
                            top: relatedTablePosition.top,
                            left: relatedTablePosition.left - 300
                        },
                        availablePlace: tableAvailablePlace,
                        placedTo: 'left'
                    }, {silent: true});

                    relatedTable.set({
                        availablePlace: relatedTableAvailablePlace
                    }, {silent: true});

                    itemView.$el.css(model.get('position'));
                } else if (relatedTableAvailablePlace.top) {
                    anchors = ['Top', 'Bottom'];
                    relatedTableAvailablePlace.top = false;
                    tableAvailablePlace.bottom = false;

                    if ((relatedTablePosition.top - 100) < 0) {
                        this.initialItemPosition.top += 100;
                        this.render();
                        return;
                    }

                    model.set({
                        position: {
                            top: relatedTablePosition.top - 100,
                            left: relatedTablePosition.left
                        },
                        availablePlace: tableAvailablePlace,
                        placedTo: 'top'
                    }, {silent: true});

                    relatedTable.set({
                        availablePlace: relatedTableAvailablePlace
                    }, {silent: true});

                    itemView.$el.css(model.get('position'));
                }

                var joinTypeWidgetView = new JoinTypeWidgetView({model: model});
                joinTypeWidgetView.$el.appendTo(this.$el);
                this._subviews.push(joinTypeWidgetView);
            } else {
                model.set({
                    position: this.initialItemPosition
                }, {silent: true});

                itemView.$el.css(model.get('position'));
            }

            if (relatedTableName) {
                (function (tableName, relatedTableName) {
                    setTimeout(function () {
                        this.plumbInstance.connect({
                            target: tableName,
                            source: relatedTableName,
                            anchors: anchors,
                            connector: 'Straight',
                            paintStyle:{ strokeStyle:"#008CBA", lineWidth: 3},
                            endpointStyle:{ fillStyle:"#008CBA", radius: 1}
                        });
                    }.bind(this), 0);
                }.bind(this)(tableName, relatedTableName));
            }

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
        onRemove: function () {
            //reset first item position
            this.initialItemPosition =  {top: 50, left: 50};
        },
        onDrop: function (event) {
            console.log('drop', this.draggedTableModel);
            var columns = this.draggedTableModel.getColumns();

            this.collection.add(_.extend(this.draggedTableModel.toJSON(), {
                columns: _.map(columns, function (value) {
                    return value.name;
                })
            }));
        },
        onSidebarTableDragStart: function (table) {
            console.log('dragstart', table);
            this.draggedTableModel = table;
        },
        onPlusClick: function (view) {
            this.active = view.model;
        },
        onSuggestedClick: function(tableModel) {
            var columns = tableModel.getColumns();
             console.log(tableModel);
            this.draggedTableModel = tableModel;

            this.collection.add(_.extend(this.draggedTableModel.toJSON(), {
                columns: _.map(columns, function (value) {
                    return value.name;
                })
            }));
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});

