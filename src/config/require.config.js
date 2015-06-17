/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
require.config({
    baseUrl: 'src',
    paths: {
        backbone: 'bower_components/backbone/backbone',
        'backbone.localStorage': 'bower_components/backbone.localStorage/backbone.localStorage',
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        text: 'bower_components/requirejs-text/text',
        css: 'bower_components/require-css/css',
        styles: '../styles',
        foundation: 'bower_components/foundation/js/foundation',
        c3: 'bower_components/c3/c3',
        d3: 'bower_components/d3/d3'
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
        },
        c3: {
            deps: ['d3']
        }
    }
});

require(['main']);