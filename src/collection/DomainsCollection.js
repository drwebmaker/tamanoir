/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainModel = require('model/DomainModel');

    require('backbone.localStorage');

    return Backbone.Collection.extend({
        model: DomainModel,
        localStorage: new Backbone.LocalStorage('domains')
    });
});