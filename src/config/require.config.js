/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
require.config({
    baseUrl: 'src',
    paths: {
        backbone: 'bower_components/backbone/backbone',
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        text: 'bower_components/requirejs-text/text',
        css: 'bower_components/require-css/css',
        styles: '../styles',
        foundation: 'bower_components/foundation/js/foundation'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        foundation: {
            deps: ['jquery']
        }
    }
});

require(['main']);