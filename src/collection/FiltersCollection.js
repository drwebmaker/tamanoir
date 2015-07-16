/**
 * Created by Artem.Malieiev on 7/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        FilterModel = require('model/FilterModel');

    return Backbone.Collection.extend({
        model: FilterModel,
        getConditions: function () {
            return this.map(function (filter) {
                return filter.get('name') + ' ' + filter.get('type') + ' \'' + filter.get('value') + '\'';
            }, this).join(' AND ');
        }
    });
});