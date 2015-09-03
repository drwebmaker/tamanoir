/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        jsPlumb = require('jsplumb'),
        _ = require('underscore'),
        DataCanvasSuggestedItemModel = require('model/DataCanvasSuggestedItemModel'),
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
            this._subview = [];
            this.listenTo(this.model, 'destroy', this.remove);

            this.render();
        },
        render: function () {
            this.$el.html(_.template(DataCanvasItemViewTemplate)(this.model.toJSON()));
            this.checkReference();
            return this;
        },
        checkReference: function() {
            if(this.model.getReferences().length == 0) {
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
            this.$('.suggested ul').empty();

            var refs = this.model.getReferences();
            var refArr = [];

            console.log(refs, 'refs');

            for(var i = 0; i < refs.length; i++) {
                refArr.push(this.parseTableName(refs[i]));
            }
            console.log(refArr, 'refArr');

            var suggestedCollection = tablesCollection.clone();

            var tmp = suggestedCollection.filter(function(item) {
                return refArr.indexOf(item.get('name')) === -1;
            });

            suggestedCollection.remove(tmp);

            console.log(suggestedCollection);
            // get suggested names
            //filter collection

            suggestedCollection.each(this.renderSuggestedTable, this);
        },

        parseTableName: function(value) {
            var found = /[\.](\w+\d?_?)/.exec(value);
            console.log(found[1]);
            return found[1];
        },

        renderSuggestedTable: function (tableModel) {
            var view = new DataCanvasSuggestedItemView({ model: tableModel });
            this._subview.push(view);
            this.$('.suggested ul').append(view.$el);
        }
    });
});