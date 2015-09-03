/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        TableModel = require('model/TableModel'),
        _ = require('underscore');

    return TableModel.extend({
        idAttribute: 'name',
        defaults: {
            name: '',
            selected: [],

            sourceTable: null,
            sourceColumn: null,
            targetTable: null,
            targetColumn: null,

            joinType: 'inner',
            availablePlace: null,
            placedTo: null,
            position: null
        },

        initialize: function () {
            this.set('availablePlace', {top: true, bottom: true, left: true, right: true});
            this.set('position', {top: 50, left: 50});
        }
    });
});