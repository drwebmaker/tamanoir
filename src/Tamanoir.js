/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        DomainModel = require('model/DomainModel'),
        MetadataExplorer = require('util/MetadataExplorer'),
        DialogView = require('view/DialogView'),
        HomeView = require('view/HomeView'),
        DomainDesignerView = require('view/DomainDesignerView');

    return Backbone.Router.extend({
        routes: {
            '(/)': 'navigateToHome',
            'connection/:connectionId': 'navigateToDomainDesigner',
            'connection/:connectionId/:domainId': 'navigateToDomainDesigner',
            '*otherwise': 'navigateToLibrary'
        },
        navigateToHome: function () {
            $('body').html(new HomeView().$el);
        },
        navigateToDomainDesigner: function (connectionId, domainId) {
            console.log('connectionId', connectionId);
            console.log('domainId', domainId);
            var domainModel;

            if (domainId) {
                domainModel = new DomainModel({id: domainId});
            } else {
                domainModel = new DomainModel({connectionId: connectionId});
            }

            $('body').html(new DomainDesignerView({ model: domainModel }).$el);
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