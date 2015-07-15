/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionsCollection = require('collection/ConnectionsCollection');

    return Backbone.Model.extend({
        defaults: {
            name: '',
            connectionId: '',
            data: []
        },
        initialize: function () {
            this.connectionsCollection = new ConnectionsCollection();

            this.listenTo(this.connectionsCollection, 'sync', this.onConnectionsSync);

            this.connectionsCollection.fetch();
        },
        onConnectionsSync: function () {
            this.connection = this.connectionsCollection.get(this.get('connectionId'));
            this.trigger('connection:sync');
        }
    });
});