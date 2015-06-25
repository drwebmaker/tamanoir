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
        DesignerView = require('view/DesignerView'),
        DesignerModel = require('model/DesignerModel'),
        SchemasView = require('view/SchemasView'),
        TablesView = require('view/TablesView'),
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
            'library/:domainId/edit': 'navigateToEditDomain',
            'library/:domainId': 'navigateToDomain',
            'library/:domainId/:schemaName': 'navigateToSchema',
            'library/:domainId/:schemaName/:tableName': 'navigateToTable',
            '*otherwise': 'navigateToLibrary'
        },
        execute: function (callback, args, name) {
            $('.main-header li.graph').hide(); //TODO: remove this hack
            callback.apply(this, args);
        },
        navigateToHome: function () {
            this.navigate('library', {trigger: true});
        },
        navigateToLibrary: function () {
            $('.main-content').html(new DomainsView().$el);
        },
        navigateToAddDomain: function () {
            $('.main-content').html(new EditDomainView({model: new DomainModel()}).$el);
        },
        navigateToEditDomain: function (id) {
            $('.main-content').html(new EditDomainView({model: new DomainModel({id: id})}).$el);
        },
        navigateToDomain: function (domainId) {
            var domain = new DomainModel({id: domainId});
            domain.fetch().done(function () {
                var metadataExplorer = new MetadataExplorer(domain);

                switch (domain.get('type')) {
                    case 'jdbc':
                        metadataExplorer.getMetaData().then(function (schemas) {
                            $('.main-content').html(new SchemasView({collection: new Backbone.Collection(schemas)}).$el);
                        });
                        break;
                    case 'csv':
                        metadataExplorer.getMetaData().then(function (columns) {
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
        navigateToSchema: function (domainId, schemaName) {
            var domain = new DomainModel({id: domainId});
            domain.fetch().done(function () {
                var metadataExplorer = new MetadataExplorer(domain);

                metadataExplorer.getMetaData(schemaName).then(function (tables) {
                    $('.main-content').html(new TablesView({collection: new Backbone.Collection(tables)}).$el);
                });
            });
        },
        navigateToTable: function (domainId, schemaName, tableName) {
            var domain = new DomainModel({id: domainId});
            domain.fetch().done(function () {
                var metadataExplorer = new MetadataExplorer(domain);

                metadataExplorer.getMetaData(schemaName + '.' + tableName).then(function (columns) {
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