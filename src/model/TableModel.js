/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        QueryExecuter = require('util/QueryExecuter'),
        DomainModel = require('model/DomainModel');

    /**
     * @example
     * new TableModel({domain: domain});
     */
    return Backbone.Model.extend({
        defaults: {
            data: [],
            metadata: null
        },

        initialize: function (config) {
            this.queryExecuter = new QueryExecuter(config.domain);
        },

        load: function (table) {
            this.get('metadata').fetch().done(_.bind(function () {
                this.queryExecuter.query('select * from ' + table + ' limit 20').then(_.bind(function (data) {
                    console.log('data loaded', data);

                    this.get('metadata').prepareMetadata(data, table);

                    if (data.length) {
                        this.set('data', data);
                        this.trigger('loaded', this);
                    } else {
                        Tamanoir.showMessage('Table is empty');
                    }
                }, this));
            }, this));
        },

        join: function (originTable, foreignTable, originKey, foreignKey) {

            var query = 'SELECT * FROM {originTable} INNER JOIN {foreignTable} ON {originKey}={foreignKey} LIMIT 20'
                .replace(/{originTable}/gi, originTable)
                .replace(/{originKey}/gi, originKey)
                .replace(/{foreignTable}/gi, foreignTable)
                .replace(/{foreignKey}/gi, foreignKey);

            this.queryExecuter.query(query).then(function (data) {
                console.log('data loaded', data);

                this.get('metadata').prepareMetadata(data, foreignTable);

                if (data.length) {
                    this.set('data', data);
                    this.trigger('loaded', this);
                } else {
                    Tamanoir.showMessage('Table is empty');
                }
            }.bind(this));
        }
    });
});