/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {

    /**
     * @param {ConnectionModel} connection
     * @constructor
     */
    var MetadataRequestFactory = function (connection) {
        this.connection = connection;
    };

    MetadataRequestFactory.prototype._jdbcRequest = function (uri) {
        return $.ajax({
            url: this.connection.get('serviceUrl') + uri,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/metadata+json'
            },
            data: JSON.stringify({
                url: this.connection.get('url'),
                type: this.connection.get('type'),
                properties: {
                    user: this.connection.get('user'),
                    password: this.connection.get('password')
                }
            })
        });
    };

    MetadataRequestFactory.prototype._csvRequest = function (uri) {
        return $.ajax({
            url: this.connection.get('serviceUrl') + uri,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/metadata+json'
            },
            data: JSON.stringify({
                url: this.connection.get('url'),
                type: this.connection.get('type'),
                properties: {
                    useFirstRowAsHeader: true
                }
            })
        });
    };

    MetadataRequestFactory.prototype.createRequest = function () {
        switch (this.connection.get('type')) {
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