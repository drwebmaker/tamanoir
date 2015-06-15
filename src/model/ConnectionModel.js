/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        defaults: {
            type: '',
            name: '',
            url: '',
            properties: null,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/metadata+json'
            }
        }
    });
});