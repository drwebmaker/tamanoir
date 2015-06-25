/**
 * Created by Artem.Malieiev on 6/12/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        ToolbarViewTemplate = require('text!template/ToolbarViewTemplate.html');

    require('css!styles/toolbar');

    return Backbone.View.extend({
        className: 'toolbar text-center',
        tagName: 'ul',
        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(_.template(ToolbarViewTemplate)(this.model.toJSON()));
            return this;
        }
    });
});