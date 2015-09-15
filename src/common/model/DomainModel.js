/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionsCollection = require('common/collection/ConnectionsCollection');

    /**
     * @class common.model.DomainModel
     */
    return Backbone.Model.extend({
        defaults: {
            /**
             * domain name
             */
            name: undefined,
            /**
             * connections
             */
            connections: [],
            /**
             * tables
             */
            tables: []
        },

        /**
         * initialize domain
         */
        initialize: function () {
            this.connections = new ConnectionsCollection(this.get('connections'));
        }
    });
});