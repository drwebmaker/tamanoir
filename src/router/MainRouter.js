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
            'domains': 'navigateToDomains',
            'designer/:domain': 'navigateToDesigner',
            '*otherwise': 'navigateToLibrary'
        },
        navigateToHome: function () {
            this.navigate('library', {trigger: true});
        },
        navigateToLibrary: function () {
            var LibraryView = require('view/library/LibraryView');
            $('.main-content').html(new LibraryView().render().$el);
        },
        navigateToDomains: function () {
            var DomainsView = require('view/domains/DomainsView');
            $('.main-content').html(new DomainsView().render().$el);
        },
        navigateToDesigner: function (domain) {
            var DesignerView = require('view/designer/DesignerView');
            $('.main-content').html(new DesignerView({
                domain: domain
            }).render().$el);
        }
    });
});