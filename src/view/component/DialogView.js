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
            'click .closeBtn': 'onCloseBtnClick'
        },
        initialize: function (config) {
            config = config || {};
            this.title = config.title;
            this.content = config.content;
        },
        render: function () {
            this.$el.html(DialogViewTemplate);
            this.$el.appendTo('body');
            this.$el.find('.dialog-title').html(this.title);
            this.$el.find('.dialog-body').html(this.content);
            this.center();
            return this;
        },
        onCloseBtnClick: function () {
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