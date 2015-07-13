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
        getQuery: function () {
            var columns = _.reduce(this.toJSON(), function (memo, value) {
                    memo.concat(value.selected);
                    return memo;
                }.bind(this), []),
                tables = _.map(this.toJSON(), function (value) { return value.name; }),
                conditions = '';

            columns = columns.length ? columns : '*';

            _.each(this.getConditions(), function (value) {
                if (conditions) {
                    conditions += ' AND ' + value;
                } else {
                    conditions = ' WHERE ' + value;
                }
            });

            return 'SELECT ' + columns + ' FROM ' + tables + conditions;
        },
        getColumnMatches: function () {
            var matches = {};
            _.each(this.toJSON(), function (canvasItem) {
                _.each(canvasItem.columns, function (columnName) {
                    if (matches[columnName]) {
                        matches[columnName].push(canvasItem.name);
                    } else {
                        matches[columnName] = [canvasItem.name];
                    }
                }.bind(this));
            }.bind(this));
            return matches;
        },
        getConditions: function () {
            var matches = {},
                conditions = [];
            _.each(this.toJSON(), function (canvasItem) {
                _.each(canvasItem.columns, function (columnName) {
                    if (matches[columnName]) {
                        conditions.push(canvasItem.name + '.' + columnName + ' = ' + matches[columnName][0] + '.' + columnName);
                    } else {
                        matches[columnName] = [canvasItem.name];
                    }
                }.bind(this));
            }.bind(this));
            return conditions;
        }
    });
});