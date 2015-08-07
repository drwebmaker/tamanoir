/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        tamanoirConfig = require('json!root/tamanoir.config.json'),
        PostgreSQLConnectionModel = require('model/PostgreSQLConnectionModel');

    require('backbone.localStorage');

    return Backbone.Collection.extend({
        model: PostgreSQLConnectionModel,
        url: tamanoirConfig.serverUrl + '/api/connections'
    });
});