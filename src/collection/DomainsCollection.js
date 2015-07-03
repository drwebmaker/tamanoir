/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainModel = require('model/DomainModel'),
        TamanoirConfig = require('json!/tamanoir.config.json');

    return Backbone.Collection.extend({
        url: TamanoirConfig.serverUrl + '/rest/domains',
        model: DomainModel,
        initialize: function () {
            this.on('error', this.showError);
        },
        showError: function () {
            Tamanoir.showError('Internal Server Error');
        }
    });
});