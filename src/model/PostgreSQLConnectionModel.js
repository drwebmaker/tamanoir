/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        tamanoirConfig = require('json!tamanoir.config.json');

    return Backbone.Model.extend({
        defaults: {
            url: '',
            database: '',
            server: '',
            port: '',
            user: '',
            password: ''
        },

        initialize: function () {
            this._metadata = null;
        },

        fetchMetadata: function () {
            return Backbone.ajax({
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
                this._metadata = data.items;
                this._buildIntellijReferences();//remove when it will be available from server api
                this.trigger('metadata:fetched');
            }.bind(this)).fail(this.showError);
        },

        getMetadata: function () {
            return this._metadata;
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
        },

        showError: _.debounce(function (error) {
            Tamanoir.showError(error.responseJSON.message);
        }, 1000, true),

        //will be processed on server side
        _buildIntellijReferences: function () {
            var columnsMap = {};
            _.each(this._metadata, function (table) {
                _.each(table.items, function (column) {
                    if(!columnsMap[column.name]) {
                        columnsMap[column.name] = [table.name]
                    } else {
                        columnsMap[column.name].push(table.name)
                    }
                }, this);
            }, this);
            
            console.log(columnsMap, '111');
        }
    });
});