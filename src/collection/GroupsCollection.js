/**
 * Created by Artem.Malieiev on 7/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        GroupModel = require('model/GroupModel');

    return Backbone.Collection.extend({
        model: GroupModel
    });
});