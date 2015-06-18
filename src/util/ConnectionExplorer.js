/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore');

    var ConnectionExplorer = function (connection) {
        this.connection = connection;
    };

    ConnectionExplorer.prototype._request = function (uri) {
        return $.ajax({
            url: this.connection.serviceUrl + uri,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/metadata+json'
            },
            data: JSON.stringify({
                url: this.connection.url,
                type: this.connection.type,
                properties: {
                    user: this.connection.user,
                    password: this.connection.password
                }
            })
        });
    };

    ConnectionExplorer.prototype._buildUri = function (uri) {
        return uri ? '?expand=' + uri : '';
    };

    ConnectionExplorer.prototype._parseMetaData = function (data) {
        return _.reduce(this._stack, function (memo, part) {
            return _.find(memo, function (value) {
                return value.name === part;
            }).items;
        }, data.items);
    };

    ConnectionExplorer.prototype._saveStack = function (uri) {
        this._stack = uri ? uri.split('.') : [];
    };

    ConnectionExplorer.prototype.getMetaData = function (uri) {
        var deferred = $.Deferred();

        this._saveStack(uri);
        this._request(this._buildUri(uri)).then(_.bind(function (data) {
            deferred.resolve(this._parseMetaData(data));
        }, this));

        return deferred;
    };

    return ConnectionExplorer;
});