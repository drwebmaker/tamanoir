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

        localStorage: new Backbone.LocalStorage('columns'),

        getCategories: function () {
            return this.filter(function (model) {
                return model.get('type') === 'category' && _.contains(this._currentData, model.get('name'));
            }.bind(this));
        },

        getNumbers: function () {
            return this.filter(function (model) {
                return model.get('type') === 'number' && _.contains(this._currentData, model.get('name'));
            }.bind(this));
        },

        /**
         * @param {Array} data
         */
        prepareMetadata: function (data, table) {
            var metadata = _.map(data[0], function (value, key) {
                var belongTo;

                if (this.get(key) && this.get(key).get('belongTo')) {
                    belongTo = this.get(key).get('belongTo');
                } else {
                    belongTo = table;
                }

                return {
                    name: key,
                    fullName: belongTo + '.' + key,
                    belongTo: belongTo,
                    type: $.isNumeric(value) ? 'number' : 'category'
                };
            }.bind(this));

            this._currentData = _.keys(data[0]);

            _.invoke(this.set(metadata, {remove: false}), 'save');
        }
    });
});