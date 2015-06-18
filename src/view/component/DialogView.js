/**
 * Created by Artem.Malieiev on 6/17/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        DialogViewTemplate = require('text!template/component/DialogViewTemplate.html');

    require('css!styles/component/dialog');

    return Backbone.View.extend({
        events: {
            'click button[data-action]': 'onActionButtonClick',
            'click .mask': 'onMaskClick'
        },
        initialize: function (config) {
            config = config || {};
            this.title = config.title || '';
            this.content = config.content || '';
            this.buttons = config.buttons || [];
        },
        render: function () {
            this.$el.html(_.template(DialogViewTemplate)(this));
            this.$el.find('.dialog-body').html(this.content);
            this.$el.appendTo('body');
            this.center();
            return this;
        },
        onActionButtonClick: function (event) {
            this.trigger('action:' + $(event.target).data('action'));
        },
        onMaskClick: function () {
            this.remove();
        },
        center: function () {
            var bodyHeight = $('body').height(),
                bodyWidth = $('body').width(),
                $dialog = this.$el.find('.dialog-container');

            $dialog.css({
                top: (bodyHeight - $dialog.height()) / 2,
                left: (bodyWidth - $dialog.width()) / 2
            });
        }
    });
});