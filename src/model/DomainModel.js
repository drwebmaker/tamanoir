/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        TamanoirConfig = require('json!/tamanoir.config.json');

    return Backbone.Model.extend({
        urlRoot: TamanoirConfig.serverUrl + '/rest/domains',
        defaults: {
            name: '',
            url: '',
            type: '',
            nativeQuery: '',
            properties: {}
        }
    });
});