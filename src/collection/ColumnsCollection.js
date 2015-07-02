/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        ColumnModel = require('model/ColumnModel');

    return Backbone.Collection.extend({
        model: ColumnModel,

        getCategories: function () {
            return this.filter(function (value) {
                var type = value.get('type');
                return !/integer/i.test(type) && !/long/i.test(type);
            });
        },

        getNumbers: function () {
            return this.filter(function (value) {
                var type = value.get('type');
                return /integer/i.test(type) || /long/i.test(type);
            });
        }
    });
});