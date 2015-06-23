/**
 * Created by Artem.Malieiev on 6/12/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        ToolbarViewTemplate = require('text!template/designer/ToolbarViewTemplate.html');

    require('css!styles/designer/toolbar');

    return Backbone.View.extend({
        events: {
            'click .toolbar-item .menu li': 'onTypeChange',
            'click .toolbar-item .foundicon-settings': 'onSettingsClick'
        },
        render: function () {
            this.$el.html(ToolbarViewTemplate);
            return this;
        },
        onTypeChange: function (event) {
            var type = $(event.target).data('chartType');
            this.trigger('change:type', event, type);
        },
        onSettingsClick: function () {
            this.trigger('click:settings');
        }
    });
});