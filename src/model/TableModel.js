/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        QueryExecuter = require('util/QueryExecuter'),
        DomainModel = require('model/DomainModel'),
        MetadataExplorer = require('util/MetadataExplorer');

    /**
     * @example
     * new TableModel({domain: domain});
     */
    return Backbone.Model.extend({
        defaults: {
            name: '',
            headers: [],
            data: [],
            metadata: {}
        },

        initialize: function (config) {
            this.metadataExplorer = new MetadataExplorer(config.domain);
            this.queryExecuter = new QueryExecuter(config.domain);

            this._table = null;
        },

        load: function (table) {
            this.set('name', table);
            this._table = table;
            this.metadataExplorer.getMetadata(table).then(_.bind(this.onMetadataLoaded, this));
        },

        onMetadataLoaded: function (metadata) {
            this.prepareMetadata(metadata);

            var columnNames = this.getColumnNames(metadata),
                query = 'SELECT {columnNames} FROM {tableName}'
                    .replace(/{columnNames}/gi, columnNames)
                    .replace(/{tableName}/gi, this._table);

            this.queryExecuter.query(query).then(_.bind(this.onDataLoaded, this));
        },

        prepareMetadata: function (metadata) {
            console.log('metadata loaded', metadata);
            this.set('metadata', _.extend(this.get('metadata'), _.reduce(metadata.items, function (memo, value) {
                memo[value.name] = _.extend(value, {belongTo: metadata.name});
                return memo;
            }, {})));
        },

        getColumnNames: function (metadata) {
            return _.map(metadata.items, function (value) {
                return metadata.name + '.' + value.name;
            });
        },

        onDataLoaded: function (data) {
            console.log('data loaded', data);
            this.prepareHeaders(data);
            this.set('data', data);
            this.trigger('loaded', this);
        },

        prepareHeaders: function (data) {
            var metadata = this.get('metadata');
            var table = this._table;
            var headers = _.map(data[0], function (value, key) {
                return {
                    name: key,
                    belongTo: table,
                    referenceTo: metadata[key].referenceTo
                };
            });

            this.set('headers', headers);
        },

        getDataForC3: function () {
            var data = this.get('data');

            return _.map(data, function (name) {
                var tmp = [name];
                _.each(data, function (value) {
                    tmp.push(value[name]);
                });
                return tmp;
            });
        },

        join: function (originTable, foreignTable, originKey, foreignKey) {

            var query = 'SELECT * FROM {originTable} INNER JOIN {foreignTable} ON {originKey}={foreignKey}'
                .replace(/{originTable}/gi, originTable)
                .replace(/{originKey}/gi, originKey)
                .replace(/{foreignTable}/gi, foreignTable)
                .replace(/{foreignKey}/gi, foreignKey);

            this.metadataExplorer.getMetadata(foreignTable).then(_.bind(function (metadata) {
                this.prepareMetadata(metadata);
                this.queryExecuter.query(query).then(_.bind(this.onDataLoaded, this));
            }, this));
        }
    });
});