/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        QueryExecuter = require('util/QueryExecuter'),
        DatabaseExplorer = require('util/DatabaseExplorer');

    return Backbone.Model.extend({
        defaults: {
            items: [],
            result: []
        },
        loadSchemas: function () {
            DatabaseExplorer.loadSchemas().then(_.bind(function (data) {
                this.set('items', data.items);
            }, this));
        },
        expand: function (path) {
            DatabaseExplorer.expand(path).then(_.bind(function (data) {
                this.set('items', data.items);
            }, this));
        },
        query: function (query) {
            QueryExecuter.query(query).then(_.bind(function (data) {
                this.set('result', data);
            }, this));
        }
    });
});