/**
 * Created by artem on 7/28/15.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        defaults: {
            sourceTable: '',
            sourceColumn: '',
            targetTable: '',
            targetColumn: '',
            joinType: 'inner'
        }
    });
});