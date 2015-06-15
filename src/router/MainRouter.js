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
            '(/)': 'navigateToHome',
            'library': 'navigateToLibrary',
            '*otherwise': 'navigateToLibrary'
        },
        navigateToHome: function () {
            this.navigate('library', {trigger: true});
        },
        navigateToLibrary: function () {
            var LibraryView = require('view/library/LibraryView');
            $('.main-content').html(new LibraryView().render().$el);
        }
    });
});