/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        MetadataRequestFactory = require('util/MetadataRequestFactory');

    /**
     *
     * @param {ConnectionModel} connection
     * @constructor
     */
    var MetadataExplorer = function (connection) {
        this.metadataRequestFactory = new MetadataRequestFactory(connection);
        this.connection = connection;
        this._request = this.metadataRequestFactory.createRequest();
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