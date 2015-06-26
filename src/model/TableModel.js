/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        QueryExecuter = require('util/QueryExecuter'),
        DomainModel = require('model/DomainModel'),
        MetadataExplorer = require('util/MetadataExplorer');

    return Backbone.Model.extend({
        defaults: {
            data: {},
            metadataExplorer: null,
            queryExecuter: null
        },

        _queryResult: null,
        _metadataResult: null,
        _tables: {},

        initialize: function (config) {
            this.metadataExplorer = new MetadataExplorer(config.domain);
            this.queryExecuter = new QueryExecuter(config.domain);
        },

        load: function (table) {
            this._queryResult = null;
            this._metadataResult = null;

            //TODO: use something like query builder
            this.queryExecuter.query(table ? 'select * from ' + table : 'select *').then(_.bind(function (data) {
                this._queryResult = data;
                this._prepareData(table);
            }, this));
            this.metadataExplorer.getMetaData(table).then(_.bind(function (metadata) {
                this._metadataResult = metadata;
                this._prepareData(table);
            }, this));
        },

        _prepareData: function (table) {
            if (!this._metadataResult || !this._queryResult) return;
            this._tables[table] = {
                metadata: this._metadataResult,
                data: this._queryResult
            };
            this.set('data', this._tables);
        },

        join: function (table) {
            this.trigger('join:completed');
        }
    });
});