/**
 * Created by Artem.Malieiev on 6/17/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionSettingsViewTemplate = require('text!template/connections/ConnectionSettingsViewTemplate');

    require('css!styles/connections/connectionSettings');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(_.template(ConnectionSettingsViewTemplate)(this.model.toJSON()));
            return this;
        },
        getValues: function () {
            return {
                type: this.$el.find('input[name="type"]').val(),
                name: this.$el.find('input[name="name"]').val(),
                url: this.$el.find('input[name="url"]').val(),
                user: this.$el.find('input[name="user"]').val(),
                password: this.$el.find('input[name="password"]').val()
            }
        }
    });
});