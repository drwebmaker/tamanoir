/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        jsPlumb = require('jsplumb'),
        _ = require('underscore'),
        DataCanvasItemViewTemplate = require('text!template/DataCanvasItemViewTemplate.html');

    require('jquery-ui');

    return Backbone.View.extend({
        className: 'data-canvas-item-view',
        template: _.template(DataCanvasItemViewTemplate),
        events: {
            'click .remove': 'onRemoveClick',
            'click input': 'onColumnClick'
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
            this.$el.html(this.template(this.model.toJSON()));
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

            //jsPlumb.addEndpoint(tableName, {
            //    isSource: true,
            //    isTarget: true,
            //    anchors: ['Top', 'Left', 'Bottom', 'Right'],
            //    endpoint: 'Rectangle',
            //    connector: 'Flowchart',
            //    paintStyle:{ fillStyle: "#008CBA" },
            //    connectorStyle:{ strokeStyle:"#008CBA", lineWidth: 3 }
            //});

            //jsPlumb.connect({
            //    source: tableName,
            //    target: relatedTable,
            //    anchor: ['Left', 'Right', 'Top', 'Bottom'],
            //    connector: 'Straight'
            //});
        },
        onRemoveClick: function (event) {
            console.log('remove', this.model);
            this.model.collection.remove(this.model);//workaround
            this.model.trigger('destroy'); //workaround
        },
        onColumnClick: function (event) {
            var value = $(event.target).is(':checked'),
                table = this.model.get('name'),
                name = $(event.target).parent().text();
            console.log('columns click', value, this.model);

            if (value) {
                this.model.set('selected', this.model.get('selected').concat(table + '.' + name));
            } else {
                this.model.set('selected', _.without(this.model.get('selected'), table + '.' + name));
            }

            console.log('selected', this.model.get('selected'));
        }
    });
});