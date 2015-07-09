/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        PostgreSQLConnectionModel = require('model/PostgreSQLConnectionModel');

    require('backbone.localStorage');

    return Backbone.Collection.extend({
        model: PostgreSQLConnectionModel,
        localStorage: new Backbone.LocalStorage('connections')
    });
});