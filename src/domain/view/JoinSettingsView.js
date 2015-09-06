/**
 * Created by artem on 7/27/15.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        JoinSettingsViewTemplate = require('text!domain/template/JoinSettingsViewTemplate.html');

    var JoinSettingsView = Backbone.View.extend({
        className: 'join-settings-view',
        events: {
            'click button': 'remove'
        },
        initialize: function (config) {
            this.config = config;
            this.render();
        },
        render: function () {
            this.$el.html(_.template(JoinSettingsViewTemplate)(this.model.toJSON()));

            this.$el.css({
                top: this.config.sender.$el.position().top + 32,
                left: this.config.sender.$el.position().left - 184
            });

            $('.data-canvas-view').append(this.$el);

            return this;
        }
    });

    return JoinSettingsView;
});
