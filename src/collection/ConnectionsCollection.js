/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionModel = require('model/ConnectionModel');

    var ConnectionsCollection = Backbone.Collection.extend({
        model: ConnectionModel
    });

    return new ConnectionsCollection();
});