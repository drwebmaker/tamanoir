/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionsCollection = require('common/collection/ConnectionsCollection');

    return Backbone.Model.extend({
        defaults: {
            name: undefined,
            connections: undefined,
            resources: undefined
        },

        initialize: function () {
            //this.connections = new ConnectionsCollection(this.get('connections'));
        },

        parse: function(response){
            response.connections = new ConnectionsCollection(response.connections);
            return response;
        }
    });
});