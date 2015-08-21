/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var _ = require('underscore');

    _.templateSettings = {
        escape: /\{\{-([\s\S]+?)\}\}/g,
        evaluate: /\{\{([\s\S]+?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g
    }
});