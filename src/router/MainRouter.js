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
            'designer': 'navigateToDesigner',
            'preview': 'navigateToPreview',
            'library': 'navigateToLibrary',
            '*invalid': 'navigateToError'
        },
        navigateToHome: function () {
            this.navigate('library', {trigger: true});
        },
        navigateToDesigner: function () {
            var DesignerView = require('view/designer/DesignerView');
            new DesignerView({el: '#content'}).render();
        },
        navigateToPreview: function () {
            var PreviewView = require('view/designer/PreviewView');
            new PreviewView({el: '#content'}).render();
        },
        navigateToLibrary: function () {
            var LibraryView = require('view/library/LibraryView');
            new LibraryView({el: '#content'}).render();
        },
        navigateToError: function () {
            var ErrorView = require('view/ErrorView');
            new ErrorView({el: '#content'}).render();
        }
    });
});