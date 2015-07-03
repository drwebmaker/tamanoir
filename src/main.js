/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Tamanoir = require('Tamanoir');

    require('/underscore.config.js');

    window.Tamanoir = new Tamanoir();
    Backbone.history.start();
});