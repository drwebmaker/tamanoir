/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DatabaseExplorer = require('util/DatabaseExplorer');

    return Backbone.Model.extend({
        defaults: {
            items: []
        },
        loadSchemas: function () {
            DatabaseExplorer.loadSchemas().then(_.bind(function (data) {
                this.set('items', data.items);
            }, this));
        },
        expandSchema: function (schemaName) {
            DatabaseExplorer.expandSchema(schemaName).then(_.bind(function (data) {
                this.set('items', data.items);
            }, this));
        }
    });
});