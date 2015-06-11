/**
 * Created by Artem.Malieiev on 6/12/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ToolbarViewTemplate = require('text!template/designer/ToolbarViewTemplate.html');

    require('css!styles/designer/toolbar');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(ToolbarViewTemplate);
            return this;
        }
    });
});