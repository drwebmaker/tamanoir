/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
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
            'database': 'navigateToDatabase',
            '*invalid': 'navigateToError'
        },
        navigateToHome: function () {
            new LayoutView({el: 'body'}).render();
        },
        navigateToDatabase: function () {
            var DatabaseView = require('view/library/DatabaseView');
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