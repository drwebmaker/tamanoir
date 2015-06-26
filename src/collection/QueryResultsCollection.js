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