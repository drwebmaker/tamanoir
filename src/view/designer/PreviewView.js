/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ToolbarView = require('view/designer/ToolbarView'),
        PreviewViewTemplate = require('text!template/designer/PreviewViewTemplate.html');

    require('css!styles/designer/preview');

    return Backbone.View.extend({
        initialize: function () {
            this.toolbar = new ToolbarView();
        },
        render: function () {
            this.$el.html(PreviewViewTemplate);
            this.$el.find('#toolbar').append(this.toolbar.render().$el);
            return this;
        }
    });
});