/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionsCollection = require('common/collection/ConnectionsCollection');

    return Backbone.Model.extend({
        defaults: {
            name: undefined,
            connections: undefined
        },

        initialize: function (attrs, options) {
            options || (options = {});

            this.connections = options.connections;
        },

        toJSON: function () {
            var json = Backbone.Model.prototype.toJSON.apply(this, arguments);

            json.connections = this.connections.toJSON();

            return json;
        }
    });
});