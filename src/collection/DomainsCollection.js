/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainModel = require('model/DomainModel'),
        TamanoirConfig = require('config/tamanoir.config');

    return Backbone.Collection.extend({
        url: TamanoirConfig.serverUrl + '/rest/domains',
        model: DomainModel
    });
});