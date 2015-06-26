/**
 * Created by Artem.Malieiev on 6/26/2015.
 */
var allTestFiles = [];
var TEST_REGEXP = /base\/test\/.*Spec\.js$/;

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(file);
    }
});

console.log(allTestFiles.join(','));

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/src',



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
    },





    // dynamically load all test files
    deps: allTestFiles,
    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});