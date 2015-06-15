/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        LayoutView = require('view/LayoutView');

    return Backbone.Router.extend({
        initialize: function () {
            new LayoutView({el: 'body'}).render();
            Backbone.history.start();
        },
        routes: {
            '(/)': 'navigateToHome',
            'home': 'navigateToHome',
            'preview': 'navigateToPreview',
            'files': 'navigateToFileExplorer',
            'database': 'navigateToDatabase',
            '*invalid': 'navigateToError'
        },
        navigateToHome: function () {
            var HomeView = require('view/HomeView');
            $('.main-section').html(new HomeView().render().$el);
        },
        navigateToFileExplorer: function () {
            var FilesExplorerView = require('view/library/FileExplorerView');
            $('.main-section').html(new FilesExplorerView().render().$el);
        },
        navigateToDatabase: function () {
            var DatabaseView = require('view/library/DatabaseExplorerView');
            $('.main-section').html(new DatabaseView().render().$el);
        },
        navigateToPreview: function () {
            var PreviewView = require('view/designer/PreviewView');
            $('.main-section').html(new PreviewView().render().$el);
        },
        navigateToError: function () {
        }
    });
});