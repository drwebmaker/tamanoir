/**
 * Created by valeriy.abornyev on 9/23/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ElementView = require('domain/view/ElementView');

    var GroupView = Backbone.View.extend({
        tagName: 'li',

        template: _.template('<div class="draggable" draggable="true">{{- name }}</div>\n<ul class="inside-list"></ul>'),

        events: {
            'mousedown .draggable:first': 'detectDrag',
            'dragstart .draggable:first': 'dragstart',
            'dragend .draggable:first': 'dragend',

            'dragenter .dropable': 'dragenter',
            'dragleave .dropable': 'dragleave',
            'drop .dropable': 'drop'
        },

        detectDrag: function (event) {
            console.log('detectDrag');
        },
        dragstart: function (event) {
            console.log('dragstart');
        },
        dragend: function (event) {
            console.log('dragend');
        },
        dragenter: function (event) {
            console.log('dragenter');
        },
        dragleave: function (event) {
            console.log('dragleave');
        },
        drop: function (event) {
            console.log('drop');
        },

        initialize: function() {
            this.listenTo(this.model, 'change:dragged', this.onDraggedChange)
        },

        render: function() {
            this.$el.html( this.template( this.model.attributes ) );

            this.collection = this.model.get('elements');

            this.collection.each(this.addOne, this);

            return this;
        },

        addOne: function(model) {
            var view;
            if(model.get('elements')) {
                view = new GroupView({model: model});
                var ul = this.$el.find('ul:first');
                ul.append(view.render().el);
                this.$el.find('ul:empty').remove();
            }

        }

    });

    return GroupView;
});