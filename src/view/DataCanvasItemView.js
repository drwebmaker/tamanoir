/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        jsPlumb = require('jsplumb'),
        _ = require('underscore');

    require('jquery-ui');

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
            this.listenTo(this.model, 'destroy', this.remove);
            this.render();
        },
        render: function () {
            this.$el.html(_.template(this.template)(this.model.toJSON()));
            this.positionalize();

            return this;
        },
        positionalize: function () {
            this.$el.css({
                top: this.model.get('position').top - 12,
                left: this.model.get('position').left - 75
            });
        },
        drawRelation: function () {
            var tableName = this.model.get('name'),
                relatedTable = this.model.get('relatedTable');

            jsPlumb.draggable(tableName);

            jsPlumb.connect({
                source: tableName,
                target: relatedTable,
                connector: 'Flowchart'
            });
        },
        onRemoveClick: function (event) {
            console.log('remove', this.model);
            this.model.collection.remove(this.model);//workaround
            this.model.trigger('destroy'); //workaround
        },
        onTableNameClick: function () {
            Tamanoir.trigger('datacanvasitem:table:click', this.model);
        }
    });
});