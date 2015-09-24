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

        template: _.template('<div>{{- name }}</div>\n<ul></ul>'),

        initialize: function() {
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
            } else {
                view = new ElementView({model: model});
            }
            var ul = this.$el.find('ul:first');
            ul.append(view.render().el);
        }

    });

    return GroupView;
});