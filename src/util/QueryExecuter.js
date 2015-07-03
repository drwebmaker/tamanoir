/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var $ = require('jquery'),
        TamanoirConfig = require('json!/tamanoir.config.json'),
        QueryRequestFactory = require('util/QueryRequestFactory');

    var QueryExecuter = function (domain) {
        this.domain = domain;
        this.serverUrl = TamanoirConfig.serverUrl + '/rest/connections';
        this._request = QueryRequestFactory.getRequest(this.domain.get('type'));
    };

    QueryExecuter.prototype.query = function (query) {
        var deferred = this._request(query);

        deferred.fail(function (error) {
            Tamanoir.showError((error.responseJSON && error.responseJSON.message) || error.statusText);
        });

        return deferred;
    };

    return QueryExecuter;
});
