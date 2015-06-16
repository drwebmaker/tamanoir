/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        SchemasListViewTemplate = require('text!template/library/SchemasListViewTemplate.html'),
        DatabaseExplorer = require('util/DatabaseExplorer');

    require('css!styles/library/schemas');

    return Backbone.View.extend({
        schemaTemplate: '<li data-name="{{- name }}">{{- name }}</li>',
        events: {
            'click li': 'onSchemaClick'
        },
        initialize: function () {
            this.databaseExplorer = new DatabaseExplorer(this.model.toJSON());
            this.collection = new Backbone.Collection();

            this.listenTo(this.collection, 'add', this.render);

            this.databaseExplorer.loadSchemas().then(_.bind(this.onLoadSchemasComplete, this));
        },
        render: function () {
            this.$el.html(SchemasListViewTemplate);
            this.collection.each(this.addSchema, this);
            return this;
        },
        addSchema: function (schemaModel) {
            this.$el.find('ul').append(_.template(this.schemaTemplate)(schemaModel.toJSON()));
        },
        onSchemaClick: function (event) {
            var schemaName = $(event.target).data('name');
            Tamanoir.application.router.navigate(Backbone.history.fragment + '/' + schemaName, {trigger: true});
        },
        onLoadSchemasComplete: function (data) {
            this.collection.add(data.items);
        }
    });
});