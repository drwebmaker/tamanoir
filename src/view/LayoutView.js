/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        LayoutViewTemplate = require('text!template/LayoutViewTemplate.html');

    require('css!bower_components/foundation/css/foundation.css');
    require('css!bower_components/foundation-icons/foundation_icons_general/stylesheets/general_foundicons.css');
    require('css!styles/base');
    require('css!styles/layout');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(LayoutViewTemplate);
            return this;
        }
    });
});