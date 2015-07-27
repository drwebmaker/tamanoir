/**
 * Created by Artem.Malieiev on 7/23/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        JoinSettingsView = require('view/JoinSettingsView');

    var JoinTypeWidgetView = Backbone.View.extend({
        className: 'join-type-widget-view',
        events: {
            'click': 'onClick'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var table = this.model.toJSON(),
                placedTo = this.model.get('placedTo');

            switch (table.placedTo) {
                case 'right':
                    this.$el.css({top: table.position.top, left: table.position.left - 65}); break;
                case 'left':
                    this.$el.css({top: table.position.top, left: table.position.left + 235}); break;
                case 'bottom':
                    this.$el.css({top: table.position.top - 50, left: table.position.left + 85}); break;
                case 'top':
                    this.$el.css({top: table.position.top + 50, left: table.position.left + 85}); break;
            }
        },
        onClick: function (event) {
            console.log('on join type click');
            new JoinSettingsView({
                model: this.model,
                sender: this
            });

        }
    });

    return JoinTypeWidgetView;
});
