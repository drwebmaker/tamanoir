/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var QueryBuilder = require('util/QueryBuilder');

    var DatabaseExplorer = function () {
        this.url = 'http://localhost:8085/rest/connections';
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
                "url":"jdbc:postgresql://localhost:5432/jasperserver",
                "properties":{"user":"postgres","password":"postgres"}
            })
        });
    };

    DatabaseExplorer.prototype.loadSchemas = function () {
        return this._request(this.url);
    };

    DatabaseExplorer.prototype.expandSchema = function (schemaName) {
        return this._request(this.url + '?expand={schemaName}'.replace('{schemaName}', schemaName));
    };

    DatabaseExplorer.prototype.expandTable = function (schemaName, tableName) {
        return this._request(this.url + '?expand={schemaName}.{tableName}'.replace('{schemaName}', schemaName).replace('{tableName}', tableName));
    };

    return new DatabaseExplorer();
});