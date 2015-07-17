/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ColumnModel = require('model/ColumnModel');

    require('backbone.localStorage');

    return Backbone.Collection.extend({
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
        getGroupByNames: function () {
            var names = [];
            _.each(this.getNumbers(), function (column) {
                names.push(column.get('groupAction') + '(' + column.get('fullName') + ') AS "' + column.get('groupAction') + '(' + column.get('name') + ')"');
            });
            return names;
        },
        prepare: function (data, columnNames) {
            var columns = _.map(data[0], function (value, key) {
                return {
                    name: key,
                    fullName: _.find(columnNames, function (name) { return name.indexOf(key) !== -1} ),
                    groupAction: $.isNumeric(value) ? 'SUM' : 'COUNT',
                    type: $.isNumeric(value) ? 'number' : 'category'
                };
            }, this);

            this.reset(columns);
        }
    });
});