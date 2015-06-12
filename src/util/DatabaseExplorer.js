/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
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

    DatabaseExplorer.prototype.expand = function (path) {
        return this._request(this.url + '?expand={path}'.replace('{path}', path));
    };

    return new DatabaseExplorer();
});