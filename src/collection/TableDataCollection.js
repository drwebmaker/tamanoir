/**
 * Created by Artem.Malieiev on 7/20/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore');

    return Backbone.Collection.extend({
        parseNumbers: function (data) {
            return _.map(data, function (value) {
                _.each(value, function (val, key) {
                    if ($.isNumeric(val)) {
                        value[key] = Number(val);
                    }
                });
                return value;
            });
        }
    });
});