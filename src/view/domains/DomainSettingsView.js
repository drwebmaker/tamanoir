/**
 * Created by Artem.Malieiev on 6/17/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainSettingsViewTemplate = require('text!template/domains/DomainSettingsViewTemplate');

    require('css!styles/domains/domainSettings');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(_.template(DomainSettingsViewTemplate)(this.model.toJSON()));
            return this;
        },
        getValues: function () {
            return {
                type: this.$el.find('input[name="type"]').val(),
                name: this.$el.find('input[name="name"]').val(),
                url: this.$el.find('input[name="url"]').val(),
                nativeQuery: this.$el.find('input[name="query"]').val(),
                properties: {
                    user: this.$el.find('input[name="user"]').val(),
                    password: this.$el.find('input[name="password"]').val()
                }
            }
        }
    });
});