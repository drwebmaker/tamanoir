/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ErrorView = require('view/ErrorView'),
        LayoutView = require('view/LayoutView');

    return Backbone.Router.extend({
        initialize: function () {
            new LayoutView({el: 'body'}).render();
            Backbone.history.start();
        },
        routes: {
            '(/)': 'navigateToHome',
            '*invalid': 'navigateToError'
        },
        navigateToHome: function () {

        },
        navigateToError: function () {
            new ErrorView({el: '#content'}).render();
        }
    });
});