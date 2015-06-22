/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var $ = require('jquery'),
        TamanoirConfig = require('config/tamanoir.config'),
        QueryRequestFactory = require('util/QueryRequestFactory');

    var QueryExecuter = function (domain) {
        this.domain = domain;
        this.serverUrl = TamanoirConfig.serverUrl + '/rest/connections';
        this._request = QueryRequestFactory.getRequest(this.domain.get('type'));
    };

    QueryExecuter.prototype.query = function (query) {
        return this._request(query);
    };

    return QueryExecuter;
});
