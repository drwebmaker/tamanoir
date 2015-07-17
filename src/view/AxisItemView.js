/**
 * Created by Artem.Malieiev on 7/14/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        AxisItemViewTemplate = require('text!template/AxisItemViewTemplate.html');

    return Backbone.View.extend({
        className: 'axis-item-view',
        template: _.template(AxisItemViewTemplate),
        events: {
            'click .remove': 'onRemoveClick'
        },
        initialize: function () {
            this._subviews = [];

            this.listenTo(this.model, 'destroy', this.remove);

            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        },
        onRemoveClick: function () {
            Tamanoir.trigger('axis:item:remove', this.model);
            this.model.destroy();
        }
    });
});