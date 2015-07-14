/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    require('backbone.localStorage');

    return Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('domains'),
        defaults: {
            name: '',
            connectionId: '',
            data: []
        }
    });
});