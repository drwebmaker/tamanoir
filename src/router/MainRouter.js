/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        DomainsCollection = require('collection/DomainsCollection'),
        MetadataExplorer = require('util/MetadataExplorer'),
        LayoutView = require('view/LayoutView');

    return Backbone.Router.extend({
        initialize: function () {
            $('body').html(new LayoutView().render().$el);
            Backbone.history.start();
        },
        routes: {
            '/': 'navigateToHome',
            'library': 'navigateToLibrary',
            'library/new': 'navigateToAddDomain',
            'library/:domainName/edit': 'navigateToEditDomain',
            'library/:domainName': 'navigateToDomain',
            'library/:domainName/:schemaName': 'navigateToSchema',
            'library/:domainName/:schemaName/:tableName': 'navigateToTable',
            '*otherwise': 'navigateToLibrary'
        },
        navigateToHome: function () {
            this.navigate('library', {trigger: true});
        },
        navigateToLibrary: function () {
            var DomainsView = require('view/library/DomainsView');
            $('.main-content').html(new DomainsView({collection: new DomainsCollection()}).render().$el);
        },
        navigateToAddDomain: function () {
            var NewDomainView = require('view/library/NewDomainView');
            $('.main-content').html(new NewDomainView().render().$el);
        },
        navigateToEditDomain: function (domainName) {
            var EditDomainView = require('view/library/EditDomainView');
            $('.main-content').html(new EditDomainView({
                domainName: domainName
            }).render().$el);
        },
        navigateToDomain: function (domainName) {
            var domainsCollection = new DomainsCollection();
            domainsCollection.fetch().then(function () {
                var domain = domainsCollection.find(function (model) {
                    return model.get('name') === domainName;
                });
                var metadataExplorer = new MetadataExplorer(domain);

                switch (domain.get('type')) {
                    case 'jdbc':
                        metadataExplorer.getMetaData().then(function (schemas) {
                            var SchemasView = require('view/library/SchemasView');
                            $('.main-content').html(new SchemasView({collection: new Backbone.Collection(schemas)}).render().$el);
                        });
                        break;
                    case 'csv':
                        metadataExplorer.getMetaData().then(function (columns) {
                            var DesignerView = require('view/designer/DesignerView'),
                                DesignerModel = require('model/DesignerModel');
                            $('.main-content').html(new DesignerView({
                                model: new DesignerModel({
                                    domain: domain
                                })
                            }).render().$el);
                        });
                        break;
                }
            });
        },
        navigateToSchema: function (domainName, schemaName) {
            var domainsCollection = new DomainsCollection();
            domainsCollection.fetch().then(function () {
                var domain = domainsCollection.find(function (model) {
                    return model.get('name') === domainName;
                });
                var metadataExplorer = new MetadataExplorer(domain);

                metadataExplorer.getMetaData(schemaName).then(function (tables) {
                    var TablesView = require('view/library/TablesView');
                    $('.main-content').html(new TablesView({collection: new Backbone.Collection(tables)}).render().$el);
                });
            });
        },
        navigateToTable: function (domainName, schemaName, tableName) {
            var domainsCollection = new DomainsCollection();
            domainsCollection.fetch().then(function () {
                var domain = domainsCollection.find(function (model) {
                    return model.get('name') === domainName;
                });
                var metadataExplorer = new MetadataExplorer(domain);

                metadataExplorer.getMetaData(schemaName + '.' + tableName).then(function (columns) {
                    var DesignerView = require('view/designer/DesignerView'),
                        DesignerModel = require('model/DesignerModel');
                    $('.main-content').html(new DesignerView({
                        model: new DesignerModel({
                            domain: domain,
                            schemaName: schemaName,
                            tableName: tableName
                        })
                    }).render().$el);
                });
            });
        }
    });
});