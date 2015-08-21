/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Tamanoir = require('Tamanoir'),
        $ = require('jquery');
        Backbone = require('backbone');

    require('underscore.config');

    window.Tamanoir = new Tamanoir();
    Backbone.history.start();

    console.log('ready');
    $('body').removeClass('flash-screen');
});