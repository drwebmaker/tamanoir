/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        DomainsCollection = require('collection/DomainsCollection'),
        EditDomainView = require('view/EditDomainView'),
        DomainsView = require('view/DomainsView'),
        DomainModel = require('model/DomainModel'),
        MetadataExplorer = require('util/MetadataExplorer'),
        DialogView = require('view/DialogView'),
        HomeView = require('view/HomeView'),
        DomainDesignerView = require('view/DomainDesignerView'),
        DesignerView = require('view/DesignerView'),
        SchemasView = require('view/SchemasView'),
        TablesView = require('view/TablesView');

    return Backbone.Router.extend({
        routes: {
            '(/)': 'navigateToHome',
            'library': 'navigateToLibrary',
            'library/new': 'navigateToAddDomain',
            'library/:domainId/edit': 'navigateToEditDomain',
            'library/:domainId': 'navigateToDomain',
            'library/:domainId/:schemaName': 'navigateToSchema',
            'library/:domainId/:schemaName/:tableName': 'navigateToTable',
            'connection/:connectionId': 'navigateToDomainDesigner',
            'connection/:connectionId/:domainId': 'navigateToDomainDesigner',
            '*otherwise': 'navigateToLibrary'
        },
        navigateToHome: function () {
            $('body').html(new HomeView().$el);
        },
        navigateToLibrary: function () {
            $('body').html(new DomainsView().$el);
        },
        navigateToAddDomain: function () {
            $('body').html(new EditDomainView({model: new DomainModel()}).$el);
        },
        navigateToEditDomain: function (id) {
            $('body').html(new EditDomainView({model: new DomainModel({id: id})}).$el);
        },
        navigateToDomain: function (domainId) {
            var domain = new DomainModel({id: domainId});
            domain.fetch().done(function () {
                var metadataExplorer = new MetadataExplorer(domain);

                switch (domain.get('type')) {
                    case 'jdbc':
                        metadataExplorer.getMetadata().then(function (metadata) {
                            var schemas = metadata.items;
                            $('body').html(new SchemasView({collection: new Backbone.Collection(schemas)}).$el);
                        });
                        break;
                    case 'csv':
                        $('body').html(new DesignerView({
                            domain: domain
                        }).$el);
                        break;
                }
            });
        },
        navigateToDomainDesigner: function (connectionId, domainId) {
            console.log(decodeURIComponent(connectionId));
            console.log(decodeURIComponent(domainId));
            $('body').html(new DomainDesignerView({connectionId: connectionId, domainId: domainId}).$el);
        },
        navigateToSchema: function (domainId, schemaName) {
            var domain = new DomainModel({id: domainId});
            domain.fetch().done(function () {
                var metadataExplorer = new MetadataExplorer(domain);

                metadataExplorer.getMetadata(schemaName).then(function (metadata) {
                    var tables = metadata.items;
                    $('body').html(new TablesView({collection: new Backbone.Collection(tables)}).$el);
                });
            });
        },
        navigateToTable: function (domainId, schemaName, tableName) {
            var domain = new DomainModel({id: domainId});
            domain.fetch().done(function () {
                $('body').html(new DesignerView({
                    domain: domain,
                    tableName: schemaName + '.' + tableName
                }).$el);
            });
        },

        /**
         * Message config
         * @param {String | Object} options
         */
        showMessage: function (options) {
            options = typeof options === 'object' ? options : {
                icon: 'idea',
                content: options,
                buttons: [{label: 'Ok'}]
            };

            return new DialogView(options).render();
        },

        /**
         * Message config
         * @param {String | Object} options
         */
        showError: function (options) {
            options = typeof options === 'object' ? options : {
                icon: 'error',
                type: 'error',
                title: 'Error',
                content: options
            };

            return new DialogView(options).render();
        }
    });
});