/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Collection.extend({
        getCategories: function () {
            return _.reduce(this.toJSON(), function (memo, value, key) {
                if (!/integer/i.test(value.type) && !/long/i.test(value.type)) {
                    memo.push(value);
                }
                return memo;
            }, []);
        },
        getNumbers: function () {
            return _.reduce(this.toJSON(), function (memo, value, key) {
                if (/integer/i.test(value.type) || /long/i.test(value.type)) {
                    memo.push(value);
                }
                return memo;
            }, []);
        },
        getReference: function (name) {
            var record = _.find(this.toJSON(), function (value) {
                return value.name === name;
            });

            return record ? record.referenceTo : null;
        }
    });
});