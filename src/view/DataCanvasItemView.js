/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        jsPlumb = require('jsplumb'),
        _ = require('underscore'),
        TableModel = require('model/TableModel'),
        DataCanvasSuggestedItemView = require('view/DataCanvasSuggestedItemView'),
        DataCanvasItemViewTemplate = require('text!template/DataCanvasItemViewTemplate.html');

    require('jquery-ui');

    return Backbone.View.extend({
        className: 'data-canvas-item-view',
        events: {
            'click .remove': 'onRemoveClick',
            'click input': 'onColumnClick',
            'click .settings': 'onSettingsClick',
            'click .plus': 'onPlusClick'
        },
        attributes: function () {
            return {
                id: this.model.get('name')
            };
        },
        initialize: function () {
            this._subviews = [];
            this.listenTo(this.model, 'destroy', this.remove);

            this.render();
        },
        render: function () {
            this.$el.html(_.template(DataCanvasItemViewTemplate)(this.model.toJSON()));
            //this.$el.css(this.model.get('position'));
            this.checkReference();
            return this;
        },
        checkReference: function() {
            if(this.model.getRelatedTableNames().length == 0) {
                this.$('.plus').hide();
            }
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
                this.model.set('selected', this.model.get('selected').concat(table + '."' + name + '"'));
            } else {
                this.model.set('selected', _.without(this.model.get('selected'), table + '."' + name + '"'));
            }

            console.log('selected', this.model.get('selected'));
        },
        onSettingsClick: function () {
            this.$('.columnsList').toggleClass('hide');
            this.$el.toggleClass('z2');
        },
        onPlusClick: function() {
            this.$('.suggestedList').toggleClass('hide');
            this.$el.toggleClass('activeItem');

            Tamanoir.trigger('onPlus:click', this);
        },

        showSuggestedList: function (tablesCollection) {
            //remove suggested dialog views
            _.invoke(this._subviews, 'remove');

            var relatedTableNames = this.model.getRelatedTableNames();

            var suggestedCollection = tablesCollection.filter(function (tableModel) {
                return _.contains(relatedTableNames, tableModel.get('name'));
            }, this);

            _.each(suggestedCollection, this.renderSuggestedTable, this);
        },

        renderSuggestedTable: function (tableModel) {
            var view = new DataCanvasSuggestedItemView({ model: tableModel });
            this._subviews.push(view);
            this.$('.suggested ul').append(view.$el);
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});