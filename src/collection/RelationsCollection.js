/**
 * Created by artem on 7/28/15.
 */
define(function (require) {
    var Backbone = require('backbone'),
        RelationModel = require('model/RelationModel');

    require('backbone.localStorage');

    return Backbone.Collection.extend({
        model: RelationModel,
        localStorage: new Backbone.LocalStorage('relations')
    });
});