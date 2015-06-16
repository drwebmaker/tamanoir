/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore');

    var DatabaseExplorer = function (connection) {
        this.serviceUrl = 'http://localhost:8085/rest/connections';
        this.user = connection.user;
        this.password = connection.password;
        this.type = connection.type;
        this.url = connection.url;
    };

    DatabaseExplorer.prototype._request = function (url) {
        return $.ajax({
            url: url,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/metadata+json'
            },
            data: JSON.stringify({
                type: this.type,
                url: this.url,
                properties: {
                    user: this.user,
                    password: this.password
                }
            })
        });
    };

    DatabaseExplorer.prototype.loadSchemas = function () {
        return this._request(this.serviceUrl);
    };

    DatabaseExplorer.prototype.loadTables = function (schemaName) {
        var deferred = $.Deferred();
        this._request(this.serviceUrl + '?expand=' + schemaName).then(function (data) {
            deferred.resolve(_.find(data.items, function (item) {
                return item.name === schemaName;
            }));
        });
        return deferred;
    };

    return DatabaseExplorer;
});