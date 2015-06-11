/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        DatabaseModel = require('model/DatabaseModel'),
        DatabaseViewTemplate = require('text!template/library/DatabaseViewTemplate.html');

    require('css!styles/library/database');

    return Backbone.View.extend({
        events: {
            'click .schema': 'expandSchema',
            'click .table': 'expandTable'
        },
        initialize: function () {
            this.model = new DatabaseModel();

            this.listenTo(this.model, 'change', this.render);

            this.model.loadSchemas();
        },
        render: function () {
            this.$el.html(_.template(DatabaseViewTemplate)(this.model.toJSON()));
            return this;
        },
        expandSchema: function (event) {
            var schemaName = $(event.target).data('schemaName');
            this.model.expandSchema(schemaName);
        },
        expandTable: function () {
            Tamanoir.application.router.navigate('preview', {trigger: true}, {hello: 'jaf'});
        }
    });
});