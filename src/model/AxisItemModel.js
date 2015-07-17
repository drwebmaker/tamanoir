/**
 * Created by Artem.Malieiev on 7/17/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        defaults: {
            name: ''
        }
    });
});