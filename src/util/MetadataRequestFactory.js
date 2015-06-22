/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {

    /**
     * @constructor
     */
    var MetadataRequestFactory = function () {};

    MetadataRequestFactory.prototype.jdbc = function (uri) {
        return $.ajax({
            url: this.serviceUrl + uri,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/metadata+json'
            },
            data: JSON.stringify({
                url: this.domain.get('url'),
                type: this.domain.get('type'),
                properties: this.domain.get('properties')
            })
        });
    };

    MetadataRequestFactory.prototype.csv = function (uri) {
        return $.ajax({
            url: this.serviceUrl + uri,
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

    MetadataRequestFactory.prototype.getRequest = function (type) {
        return this[type];
    };

    return MetadataRequestFactory;
});