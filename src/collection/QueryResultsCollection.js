/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore');

    var QueryResultsCollection = Backbone.Collection.extend({
        getNames: function () {
            return _.keys(this.toJSON()[0]);
        },
        getCategoriesNames: function () {
            return _.reduce(this.toJSON()[0], function (memo, value, key) {
                if (!$.isNumeric(value)) {
                    memo.push(key);
                }
                return memo;
            }, []);
        },
        getNumbersNames: function () {
            return _.reduce(this.toJSON()[0], function (memo, value, key) {
                if ($.isNumeric(value)) {
                    memo.push(key);
                }
                return memo;
            }, []);
        },
        getDataForC3: function () {
            var data = this.toJSON();

            return _.map(this.getNumbersNames(), function (name) {
                var tmp = [name];
                _.each(data, function (value) {
                    tmp.push(value[name]);
                });
                return tmp;
            });
        }
    });

    return QueryResultsCollection;
});