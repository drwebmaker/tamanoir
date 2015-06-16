/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        LayoutView = require('view/LayoutView');

    return Backbone.Router.extend({
        initialize: function () {
            $('body').html(new LayoutView().render().$el);
            Backbone.history.start();
        },
        routes: {
            '/': 'navigateToHome',
            'library': 'navigateToLibrary',
            'library/:connectionName': 'navigateToConnection',
            'library/:connectionName/:schemaName': 'navigateToSchema',
            'preview/:connectionName/:schemaName/:tableName': 'navigateToPreview',
            '*otherwise': 'navigateToLibrary'
        },
        navigateToHome: function () {
            this.navigate('library', {trigger: true});
        },
        navigateToConnection: function (connectionName) {
            var SchemasListView = require('view/library/SchemasListView'),
                connectionModel;

            connectionModel = Tamanoir.application.collection.connections.find(function (model) {
                return model.get('name') === connectionName;
            });

            switch (connectionModel.get('type')) {
                case 'jdbc':
                    $('.main-content').html(new SchemasListView({model: connectionModel}).render().$el);
                    break;
                case 'csv':
                    break;
            }
        },
        navigateToPreview: function (connectionName, schemaName, tableName) {
            var PreviewView = require('view/preview/PreviewView'),
                connectionModel;

            connectionModel = Tamanoir.application.collection.connections.find(function (model) {
                return model.get('name') === connectionName;
            });

            $('.main-content').html(new PreviewView({
                connectionModel: connectionModel,
                schemaName: schemaName,
                tableName: tableName
            }).render().$el);
        },
        navigateToSchema: function (connectionName, schemaName) {
            var TablesListView = require('view/library/TablesListView'),
                connectionModel;

            connectionModel = Tamanoir.application.collection.connections.find(function (model) {
                return model.get('name') === connectionName;
            });

            $('.main-content').html(new TablesListView({
                connectionModel: connectionModel,
                schemaName: schemaName
            }).render().$el);
        },
        navigateToLibrary: function () {
            var LibraryView = require('view/library/LibraryView');
            $('.main-content').html(new LibraryView().render().$el);
        }
    });
});