/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var MainRouter = require('common/router/MainRouter'),
        $ = require('jquery');

    require('underscore.config');

    window.Tamanoir = new MainRouter();
    Backbone.history.start();

    //remove loading screen
    $('body').removeClass('splash-screen');
});