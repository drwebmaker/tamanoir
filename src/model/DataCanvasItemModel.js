/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        idAttribute: 'name',
        defaults: {
            name: '',
            columns: [],
            selected: [],
            position: {top: 0, left: 0}
        }
    });
});