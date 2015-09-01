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
            relatedTable: null,

            sourceTable: null,
            sourceColumn: null,
            targetTable: null,
            targetColumn: null,

            joinType: 'inner',
            position: {top: 0, left: 0}
        },
        initialize: function () {
            var relatedTableModel = this.collection.chain()
                .without(this)
                .find(function (model, index) {
                    return _.intersection(_.pluck(model.get('items'), 'name'), _.pluck(this.get('items'), 'name'))[0];
                }.bind(this))
                .value();

            relatedTableModel && this.set('relatedTable', relatedTableModel.get('name'));
        }
    });
});