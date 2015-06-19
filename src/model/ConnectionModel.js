/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        defaults: {
            serviceUrl: 'http://localhost:8085/rest/connections',
            type: '',
            name: '',
            url: '',
            user: '',
            password: ''
        }
    });
});