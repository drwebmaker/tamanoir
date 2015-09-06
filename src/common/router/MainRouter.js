/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        DomainModel = require('common/model/DomainModel'),
        DialogView = require('common/view/DialogView'),
        HomeView = require('home/view/HomeView'),
        ConnectionsCollection = require('common/collection/ConnectionsCollection'),
        DomainsCollection = require('common/collection/DomainsCollection'),
        DomainDesignerView = require('domain/view/DomainDesignerView');

    return Backbone.Router.extend({

        routes: {
            '(/)': 'navigateToHome',
            'domain/:entityId': 'navigateToDomainDesigner',
            '*otherwise': 'navigateToHome'
        },

        navigateToHome: function () {
            //set url to '/' for otherwise routes
            this.navigate('/');

            this.loadView(new HomeView());
        },

        navigateToDomainDesigner: function (entityId) {
            var connectionsCollection = new ConnectionsCollection(),
                domainsCollection = new DomainsCollection(),
                self = this;

            //try to find domain by entityId
            domainsCollection.fetch().then(function () {
                var domain = domainsCollection.get(entityId);

                if (domain) {

                } else {
                    //try to find connection by entityId
                    connectionsCollection.fetch().then(function () {
                        var connection = connectionsCollection.get(entityId);

                        if (connection) {
                            self.loadView(new DomainDesignerView({model: new DomainModel({}, {
                                connections: new ConnectionsCollection([connection])
                            })}));
                        } else {
                            throw "no domain or connection find";
                        }
                    });
                }
            });
        },

        loadView: function (view) {
            this.current && this.current.remove();
            this.current = view;
            $('body').html(this.current.$el);
        }
    });
});