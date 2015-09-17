/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var ConnectionModel = require('common/model/ConnectionModel'),
        _ = require('underscore'),
        $ = require('jquery'),
        tamanoirConfig = require('tamanoir.config');

    return ConnectionModel.extend({

        defaults: _.extend({}, ConnectionModel.prototype.defaults, {
            url: undefined,
            database: undefined,
            server: undefined,
            port: undefined,
            user: undefined,
            password: undefined
        }),

        fetchMetadata: function () {
            var deferred = $.Deferred(),
                self = this;

            $.ajax({
                url: tamanoirConfig.serverUrl + '/rest/connections?include=public',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/metadata+json'
                },
                data: JSON.stringify({
                    url: this.get('url'),
                    type: 'jdbc',
                    properties: {
                        user: this.get('user'),
                        password: this.get('password')
                    }
                })
            }).then(function (data) {
                self.set('metadata', data.elements);
                deferred.resolve(data.elements);
            }).fail(this.showError);

            return deferred;
        },

        query: function (query) {
            return Backbone.ajax({
                url: tamanoirConfig.serverUrl + '/rest/connections',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/queryconnection+json',
                    'Accept': 'application/json'
                },
                data: JSON.stringify({
                    url: this.get('url'),
                    type: 'jdbc',
                    properties: {
                        user: this.get('user'),
                        password: this.get('password')
                    },
                    nativeQuery: query
                })
            }).fail(this.showError);
        }
    });
});