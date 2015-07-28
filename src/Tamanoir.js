/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        DomainModel = require('model/DomainModel'),
        DialogView = require('view/DialogView'),
        AnalysisView = require('view/AnalysisView'),
        HomeView = require('view/HomeView'),
        DomainDesignerView = require('view/DomainDesignerView');

    return Backbone.Router.extend({
        routes: {
            '(/)': 'navigateToHome',
            'connection/:connectionId': 'navigateToDomainDesigner',
            'connection/:connectionId/:domainId': 'navigateToDomainDesigner',
            'analysis/:connectionId/:domainId': 'navigateToAnalysisDomain',
            '*otherwise': 'navigateToLibrary'
        },
        navigateToHome: function () {
            this.current && this.current.remove();
            this.current = new HomeView();
            $('body').html(this.current.$el);
        },
        navigateToDomainDesigner: function (connectionId, domainId) {
            console.log('connectionId', connectionId);
            console.log('domainId', domainId);

            this.current && this.current.remove();
            this.current = new DomainDesignerView({ model: new DomainModel({id: domainId, connectionId: connectionId})});
            $('body').html(this.current.$el);
        },

        navigateToAnalysisDomain: function (connectionId, domainId) {
            console.log('connectionId', connectionId);
            console.log('domainId', domainId);

            this.current && this.current.remove();
            this.current = new AnalysisView({ model: new DomainModel({id: domainId, connectionId: connectionId})});
            $('body').html(this.current.$el);
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