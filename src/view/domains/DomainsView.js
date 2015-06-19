/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainsViewTemplate = require('text!template/domains/DomainsViewTemplate.html');

    require('css!styles/domains/domains');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(DomainsViewTemplate);
            return this;
        }
    });
});