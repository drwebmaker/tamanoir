/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    require('backbone.localStorage');

    return Backbone.Model.extend({
        idAttribute: 'url',
        localStorage: new Backbone.LocalStorage('connections'),
        defaults: {
            url: '',
            type: '',
            server: '',
            port: '',
            username: '',
            password: ''
        }
    });
});