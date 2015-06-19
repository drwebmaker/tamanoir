/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionsCollection = require('collection/ConnectionsCollection'),
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
            'connections': 'navigateToConnections',
            'connections/:connectionName': 'navigateToConnection',
            'connections/:connectionName/:schemaName': 'navigateToSchema',
            'preview/:connectionName/:schemaName/:tableName': 'navigateToPreview',
            'designer': 'navigateToDesigner',
            '*otherwise': 'navigateToLibrary'
        },
        navigateToHome: function () {
            this.navigate('library', {trigger: true});
        },
        navigateToDesigner: function () {
            var DesignerView = require('view/designer/DesignerView');
            $('.main-content').html(new DesignerView().render().$el);
        },
        navigateToConnections: function () {
            var ConnectionsView = require('view/connections/ConnectionsView');
            $('.main-content').html(new ConnectionsView().render().$el);
        },
        navigateToConnection: function (connectionName) {
            var SchemasListView = require('view/connections/SchemasListView'),
                PreviewView = require('view/preview/PreviewView'),
                connectionModel;

            connectionModel = ConnectionsCollection.find(function (model) {
                return model.get('name') === connectionName;
            });

            switch (connectionModel.get('type')) {
                case 'jdbc':
                    $('.main-content').html(new SchemasListView({model: connectionModel}).render().$el);
                    break;
                case 'csv':
                    $('.main-content').html(new PreviewView({connectionModel: connectionModel}).render().$el);
                    break;
            }
        },
        navigateToPreview: function (connectionName, schemaName, tableName) {
            var PreviewView = require('view/preview/PreviewView'),
                connectionModel;

            connectionModel = ConnectionsCollection.find(function (model) {
                return model.get('name') === connectionName;
            });

            $('.main-content').html(new PreviewView({
                connectionModel: connectionModel,
                schemaName: schemaName,
                tableName: tableName
            }).render().$el);
        },
        navigateToSchema: function (connectionName, schemaName) {
            var TablesListView = require('view/connections/TablesListView'),
                connectionModel;

            connectionModel = ConnectionsCollection.find(function (model) {
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