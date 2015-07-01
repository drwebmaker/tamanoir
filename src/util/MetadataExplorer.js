/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        TamanoirConfig = require('config/tamanoir.config'),
        MetadataRequestFactory = require('util/MetadataRequestFactory');

    /**
     *
     * @param {DomainModel} domain
     * @constructor
     */
    var MetadataExplorer = function (domain) {
        this.domain = domain;
        this.serviceUrl = TamanoirConfig.serverUrl + '/rest/connections'
        this.metadataRequestFactory = new MetadataRequestFactory();
        this._request = this.metadataRequestFactory.getRequest(this.domain.get('type'));
    };

    MetadataExplorer.prototype._buildUri = function (uri) {
        return uri ? '?include=' + uri : '';
    };

    MetadataExplorer.prototype.getMetadata = function (uri) {
        var deferred = $.Deferred();

        this._request(this._buildUri(uri)).then(deferred.resolve);

        return deferred;
    };

    return MetadataExplorer;
});