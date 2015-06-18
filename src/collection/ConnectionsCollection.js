/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionModel = require('model/ConnectionModel');

    require('backbone.localStorage');

    var ConnectionsCollection = Backbone.Collection.extend({
        model: ConnectionModel,
        localStorage: new Backbone.LocalStorage('connections'),
        initialize: function () {
            this.fetch();
        }
    });

    return new ConnectionsCollection();
});