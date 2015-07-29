/**
 * Created by Artem.Malieiev on 7/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        GroupModel = require('model/GroupModel');

    return Backbone.Collection.extend({
        model: GroupModel,
        getGroups: function () {
            return this.map(function (group) {
                return '"' + group.get('value') + '"';
            }, this);
        }
    });
});