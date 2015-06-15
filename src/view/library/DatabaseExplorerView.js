/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        DatabaseModel = require('model/DatabaseModel'),
        DatabaseSelectionModel = require('model/DatabaseSelectionModel'),
        DatabaseViewTemplate = require('text!template/library/DatabaseExplorerViewTemplate.html');

    require('css!styles/library/database');

    return Backbone.View.extend({
        className: 'database',
        events: {
            'click .schema': 'expandSchema',
            'click .table': 'expandTable'
        },
        initialize: function () {
            this.model = new DatabaseModel();

            this.listenTo(this.model, 'change:items', this.render);

            this.model.loadSchemas();
        },
        render: function () {
            this.$el.html(_.template(DatabaseViewTemplate)(this.model.toJSON()));
            this.calculateHeight();
            return this;
        },
        calculateHeight: function () {
            setTimeout(_.bind(function () {
                this.$el.find('.content').height(this.$el.parent().height() - this.$el.find('.title').height());
            }, this), 0);
        },
        expandSchema: function (event) {
            var schemaName = $(event.target).data('schemaName');
            DatabaseSelectionModel.set('schema', schemaName);
            this.model.expand(schemaName);
        },
        expandTable: function (event) {
            var tableName = $(event.target).data('tableName');
            DatabaseSelectionModel.set('table', DatabaseSelectionModel.get('schema') + '.' + tableName);
            Tamanoir.application.router.navigate('preview', {trigger: true});
        }
    });
});