/**
 * Created by artem on 7/29/15.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        TableModel = require('domain/model/TableModel');

    require('backbone.localStorage');

    return Backbone.Collection.extend({
        model: TableModel,

        getSelectedColumns: function () {
            return this.reduce(function (memo, table) {
                memo = memo.concat(_.map(table.get('selected'), function (column) {
                    return table.get('name') + '."' + column + '"';
                }));

                return memo;
            }, []);
        },

        getTables: function () {
            return this.map(function (table) {
                return table.get('name');
            });
        },

        getColumns: function () {
            return this.reduce(function (memo, table) {
                memo = memo.concat(_.map(table.get('items'), function (column) {
                    return table.get('name') + '."' + column.name + '"';
                }));

                return memo;
            }, []);
        },

        getSelectedTables: function () {
            return this.reduce(function (memo, table) {
                if (table.get('selected').length) {
                    memo.push(table.get('name'));
                }

                return memo;
            }, []);
        },

        getSelectedConditions: function () {
            var conditions = [],
                relations = [],
                tableNames = this.getSelectedTables();

            if (tableNames.length < 2) {
                return conditions;
            }

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
        },

        getConditions: function () {
            var conditions = [],
                relations = [],
                tableNames = this.getTables();

            if (tableNames.length < 2) {
                return conditions;
            }

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
        },

        getDataCanvasModel: function () {
            var model = {
                nodes: [],
                edges: []
            };

            this.each(function (item) {
                model.nodes.push({id: item.get('name'), label: item.get('name')});
                _.each(item.get('items'), function (column) {
                    if (column.referenceTo) {
                        model.edges.push({from: item.get('name'), to: item._getRelatedTableName(column)});
                    }
                });
            });
            return model;
        },

        getQuery: function () {
            var query = null,
                tables = this.getSelectedTables(),
                columns = this.getSelectedColumns(),
                conditions = this.getSelectedConditions();

            //when no column is selected build query for all tables which is on data canvas
            if (columns.length == 0) {
                tables = this.getTables();
                columns = this.getColumns();
                conditions = this.getConditions();
            }

            if (tables.length == 0) {
                return null;
            } else if (conditions.length) {
                query = 'SELECT ' + columns + ' FROM ' + tables + ' WHERE ' + conditions.join(' AND ');
            } else {
                query = 'SELECT ' + columns + ' FROM ' + tables;
            }

            return query;
        }
    });
});