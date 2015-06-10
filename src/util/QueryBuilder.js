/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var $ = require('jquery');

    var QueryBuilder = function () {};

    QueryBuilder.prototype.test = function () {
        $.ajax({
            url: 'http://localhost:8085/rest/connections',
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

    return QueryBuilder;
});
