/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        DataCanvasItemModel = require('model/DataCanvasItemModel');

    return Backbone.Collection.extend({
        model: DataCanvasItemModel,
        getColumns: function () {
            var columns = [];
            _.each(this.toJSON(), function (value) {
                columns = columns.concat(value.selected);
            }, this);

            //if no one is selected then return whole list
            if (!columns.length) {
                this.each(function (canvasItem) {
                    columns = columns.concat(_.map(canvasItem.getColumns(), function (column) {
                        return canvasItem.get('name') + '."' + column.name + '"';
                    }));
                }, this);
            }

            return columns;
        },
        getTables: function () {
            return this.map(function (value) {
                return value.get('name');
            });
        },
        getConditions: function () {
            var conditions = [];
            if (this.size() < 2) {
                return conditions;
            }

            var relations = [];
            var tableNames = this.getTables();

            this.each(function (model) {
                var relatedTableNames = _.intersection(model.getRelatedTableNames(), tableNames);
                _.each(relatedTableNames, function (relatedTableName) {
                    relations.push(model.getRelationForTable(relatedTableName));
                });
            }, this);

            _.each(relations, function (relation) {
                conditions.push(relation.sourceTableName + '."' + relation.sourceColumnName + '" = ' + relation.targetTableName + '."' + relation.targetColumnName + '"');
            });

            return conditions;
        }
    });
});