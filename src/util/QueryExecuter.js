/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var $ = require('jquery');

    var QueryExecuter = function () {};

    QueryExecuter.prototype._request = function (query) {
        return $.ajax({
            url: 'http://localhost:8085/rest/connections',
            method: 'post',
            headers: {
                'Content-Type': 'application/queryconnection+json',
                'Accept': 'application/json'
            },
            data: JSON.stringify({
                type: 'jdbc',
                url: 'jdbc:postgresql://localhost:5432/jasperserver',
                properties: {user: 'postgres',password: 'postgres'},
                nativeQuery: query
            })
        });
    };

    QueryExecuter.prototype.query = function (query) {
        return this._request(query);
    };

    return new QueryExecuter();
});
