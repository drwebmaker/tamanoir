/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        QueryExecuter = require('util/QueryExecuter'),
        QueryResultsCollection = require('collection/QueryResultsCollection'),
        PreviewViewTemplate = require('text!template/preview/PreviewViewTemplate.html'),
        TableView = require('view/preview/TableView');

    require('css!styles/preview/preview');

    return Backbone.View.extend({
        events: {
            'click .edit': 'onEditButtonClick'
        },
        initialize: function (config) {
            this.connectionModel = config.connectionModel;
            this.schemaName = config.schemaName;
            this.tableName = config.tableName;
            this.queryExecuter = new QueryExecuter(this.connectionModel.toJSON());

            this.tableView = new TableView({
                collection: QueryResultsCollection
            });

            this.queryExecuter.query('SELECT * FROM {schemaName}.{tableName}'
                .replace('{schemaName}', this.schemaName)
                .replace('{tableName}', this.tableName))
                .then(_.bind(function (result) {
                    QueryResultsCollection.reset(result);
                }, this));
        },
        render: function () {
            this.$el.html(PreviewViewTemplate);
            this.$el.find('.holder').html(this.tableView.render().$el);
            return this;
        },
        onEditButtonClick: function () {
            Tamanoir.application.router.navigate('designer', {trigger: true});
        }
    });
});