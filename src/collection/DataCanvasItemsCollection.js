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
                    memo = memo.concat(value.selected);
                    return memo;
                }.bind(this), []),
                tables = _.map(this.toJSON(), function (value) { return value.name; }),
                conditions = '';

            columns = columns.length ? columns : '*';

            _.each(this.getConditions(), function (value) {
                if (conditions) {
                    conditions += ' AND ' + value;
                } else {
                    conditions = '\nWHERE\n\t' + value;
                }
            });

            return 'SELECT\n\t' + columns + '\nFROM\n\t' + tables + conditions + '\nLIMIT 1000';
        },
        serialize: function () {
            return encodeURIComponent(JSON.stringify(this.toJSON()));
        },
        deserialize: function (str) {
            this.reset(JSON.parse(decodeURIComponent(str)));
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
                alreadyMathed = {},
                conditions = [];
            _.each(this.toJSON(), function (canvasItem) {
                _.each(canvasItem.columns, function (columnName) {
                    if (matches[columnName]) {
                        var t1 = canvasItem.name,
                            t2 = matches[columnName][0];

                        if (!alreadyMathed[t1]) {
                            alreadyMathed[t1] = {};
                        }

                        alreadyMathed[t1][t2] = columnName;
                    } else {
                        matches[columnName] = [canvasItem.name];
                    }
                }.bind(this));
            }.bind(this));

            _.each(alreadyMathed, function (value, key) {
                conditions.push(key + '.' + _.values(value)[0] + ' = ' + _.keys(value)[0] + '.' +  _.values(value)[0]);
            }.bind(this));

            return conditions;
        }
    });
});