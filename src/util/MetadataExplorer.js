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
        return uri ? '?expand=' + uri : '';
    };

    MetadataExplorer.prototype._parseMetaData = function (data) {
        return _.reduce(this._chunks, function (memo, part) {
            return _.find(memo, function (value) {
                return value.name === part;
            }).items;
        }, data.items);
    };

    MetadataExplorer.prototype._saveChunks = function (uri) {
        this._chunks = uri ? uri.split('.') : [];
    };

    MetadataExplorer.prototype.getMetaData = function (uri) {
        var deferred = $.Deferred();

        this._saveChunks(uri);
        this._request(this._buildUri(uri)).then(_.bind(function (data) {
            deferred.resolve(this._parseMetaData(data));
        }, this));

        return deferred;
    };

    return MetadataExplorer;
});