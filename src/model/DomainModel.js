/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        TamanoirConfig = require('config/tamanoir.config');

    return Backbone.Model.extend({
        urlRoot: TamanoirConfig.serverUrl + '/rest/domains',
        defaults: {
            name: '',
            url: '',
            type: '',
            nativeQuery: '',
            properties: null
        }
    });
});