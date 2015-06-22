/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {

    /**
     * @param {DomainModel} domain
     * @constructor
     */
    var QueryRequestFactory = function () {};

    QueryRequestFactory.prototype.getRequest = function (type) {
        return this[type];
    };

    QueryRequestFactory.prototype.jdbc = function (query) {
        return $.ajax({
            url: this.serverUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/queryconnection+json',
                'Accept': 'application/json'
            },
            data: JSON.stringify({
                url: this.domain.get('url'),
                type: this.domain.get('type'),
                properties: this.domain.get('properties'),
                nativeQuery: query
            })
        });
    };

    QueryRequestFactory.prototype.csv = function (query) {
        return $.ajax({
            url: this.serverUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/queryconnection+json',
                'Accept': 'application/json'
            },
            data: JSON.stringify({
                url: this.domain.get('url'),
                type: this.domain.get('type'),
                properties: {
                    useFirstRowAsHeader: true
                },
                nativeQuery: query
            })
        });
    };

    return new QueryRequestFactory();
});