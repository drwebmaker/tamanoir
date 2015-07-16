/**
 * Created by Artem.Malieiev on 7/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        defaults: {
            name: '',
            type: 'LIKE',
            value: ''
        }
    });
});