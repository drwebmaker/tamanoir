/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        defaults: {
            connectionId: '',
            name: '',
            label: '',
            items: null
        },

        getColumns: function () {
            return this.get('items');
        },

        getReferences: function () {
            return _.reduce(this.get('items'), function (memo, column) {
                if (column.referenceTo) {
                    memo.push(column.referenceTo);
                }
                return memo;
            }, [], this);
        }
    });
});