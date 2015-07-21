/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore');

    return Backbone.View.extend({
        className: 'data-canvas-item-view',
        template: '<i class="remove foundicon-remove"></i><div class="table-name">{{- name }}</div>',
        events: {
            'click .remove': 'onRemoveClick',
            'click .table-name': 'onTableNameClick'
        },
        attributes: function () {
            return {
                id: this.model.get('name')
            };
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(_.template(this.template)(this.model.toJSON()));
            return this;
        },
        onRemoveClick: function (event) {
            console.log('remove', this.model);
            this.model.collection.remove(this.model);
        },
        onTableNameClick: function () {
            Tamanoir.trigger('datacanvasitem:table:click', this.model);
        }
    });
});