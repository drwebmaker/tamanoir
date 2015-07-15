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

        prepare: function (data) {
            var columns = _.map(data[0], function (value, key) {
                return {
                    name: key,
                    type: $.isNumeric(value) ? 'number' : 'category'
                };
            }, this);

            this.reset(columns);
        }
    });
});