/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {

    /**
     * @param {DomainModel} domain
     * @constructor
     */
    var MetadataRequestFactory = function (domain) {
        this.domain = domain;
    };

    MetadataRequestFactory.prototype._jdbcRequest = function (uri) {
        return $.ajax({
            url: this.domain.get('serviceUrl') + uri,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/metadata+json'
            },
            data: JSON.stringify({
                url: this.domain.get('url'),
                type: this.domain.get('type'),
                properties: {
                    user: this.domain.get('user'),
                    password: this.domain.get('password')
                }
            })
        });
    };

    MetadataRequestFactory.prototype._csvRequest = function (uri) {
        return $.ajax({
            url: this.domain.get('serviceUrl') + uri,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/metadata+json'
            },
            data: JSON.stringify({
                url: this.domain.get('url'),
                type: this.domain.get('type'),
                properties: {
                    useFirstRowAsHeader: true
                }
            })
        });
    };

    MetadataRequestFactory.prototype.createRequest = function () {
        switch (this.domain.get('type')) {
            case 'jdbc':
                return this._jdbcRequest;
                break;
            case 'csv':
                return this._csvRequest;
                break;
        }
    };

    return MetadataRequestFactory;
});