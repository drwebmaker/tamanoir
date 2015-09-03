/**
 * Created by valeriy.abornyev on 8/27/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        defaults: {
            name: '',
            tableName: ''
        }
        //initialize: function () {
        //    var getName = this.get('name');
        //    var getTableName = this.parseTableName(getName);
        //    this.set('tableName', getTableName);
        //},
        //
        //parseTableName: function(value) {
        //    var found = /[\.](\w+\d?_?)/.exec(value);
        //    return found[1];
        //}
    });
});