/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        TableListItemViewTemplate = require('text!domain/template/TableListItemViewTemplate.html');

    return Backbone.View.extend({

        tagName: 'li',
        attributes: {
            draggable: true
        },
        className: 'table-list-item-view',
        template: _.template(TableListItemViewTemplate),
        events: {
            'dragstart': 'onDragStart'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        onDragStart: function () {
            Tamanoir.trigger('tables:table:dragstart', this.model);
        }
    });
});