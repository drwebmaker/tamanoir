/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        tamanoirConfig = require('json!root/tamanoir.config.json');

    require('backbone.localStorage');

    return Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('connections'),
        defaults: {
            url: '',
            database: '',
            server: '',
            port: '',
            user: '',
            password: ''
        },
        getTables: function () {
            var deferred = $.Deferred();

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
                deferred.resolve(data.items);
            });

            return deferred;
        },
        logTables: function () {
            this.getTables().then(function (tables) {
                console.log(tables);
            });
        },
        getColumns: function (table) {
            var deferred = $.Deferred();

            $.ajax({
                url: tamanoirConfig.serverUrl + '/rest/connections?include=public.' + table,
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
                deferred.resolve(data.items);
            });

            return deferred;
        },
        logColumns: function (table) {
            this.getColumns(table).then(function (columns) {
                console.log(columns);
            });
        },
        query: function (query) {
            var deferred = $.Deferred();

            $.ajax({
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
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred;
        },
        logQuery: function (query) {
            this.query(query).then(function (data) {
                console.log(data);
            });
        }
    });
});