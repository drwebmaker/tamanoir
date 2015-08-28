/**
 * Created by valeriy.abornyev on 8/27/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        defaults: {
            tableName: ''
        }
    });
});