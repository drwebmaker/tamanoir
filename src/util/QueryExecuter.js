/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var $ = require('jquery');

    var QueryExecuter = function (connection) {
        this.serviceUrl = 'http://localhost:8085/rest/connections';
        this.url = connection.url;
        this.type = connection.type;
        this.user = connection.user;
        this.password = connection.password;
    };

    QueryExecuter.prototype._request = function (query) {
        return $.ajax({
            url: this.serviceUrl,
            method: 'post',
            headers: {
                'Content-Type': 'application/queryconnection+json',
                'Accept': 'application/json'
            },
            data: JSON.stringify({
                type: this.type,
                url: this.url,
                properties: {
                    useFirstRowAsHeader: true,
                    user: this.user,
                    password: this.password
                },
                nativeQuery: query
            })
        });
    };

    QueryExecuter.prototype.query = function (query) {
        return this._request(query);
    };

    return QueryExecuter;
});
