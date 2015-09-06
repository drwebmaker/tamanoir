/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ColumnModel = require('domain/model/ColumnModel');

    require('backbone.localStorage');

    return Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage('columns'),
        model: ColumnModel,
        getCategories: function () {
            return this.filter(function (model) {
                return model.get('type') === 'category';
            }.bind(this));
        },

        getNumbers: function () {
            return this.filter(function (model) {
                return model.get('type') === 'number';
            }.bind(this));
        },
        getGroupByNames: function (groups, filters) {
            var names = [],
                filters = _.map(filters, function (v) {
                    return v.slice(v.indexOf('LIKE') + 5)
                });
            _.each(this.getNumbers(), function (column) {
                names.push(column.get('groupAction') + '(' + column.get('name') + ') AS "' + column.get('groupAction') + '(' + column.get('label') + ')' + filters + '"');
            });
            return names;
        },
        prepare: function (data, columnNames) {
            var columns = _.map(data[0], function (value, key) {
                return {
                    label: key,
                    name: _.find(columnNames, function (name) {
                        return name.indexOf(key) !== -1
                    }),
                    groupAction: $.isNumeric(value) ? 'SUM' : 'COUNT',
                    type: $.isNumeric(value) ? 'number' : 'category'
                };
            }, this);

            this.reset(columns);
        }
    });
});