/**
 * Created by valeriy.abornyev on 9/10/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        RightSidebarColumnsItemView = require('domain/view/RightSidebarColumnsItemView');

    return Backbone.View.extend({
        tagName: "ul",


        initialize: function(){
            this._subviews = [];
            this.collection = new Backbone.Collection(this.model.get('items'));
            this.listenTo(this.collection, 'change', this.onCheckboxChange);
            this.render();
        },

        render: function() {
            _.invoke(this._subviews, 'remove');
            this.collection.each(this.addColumn, this);
            return this;
        },

        addColumn: function(model) {
            var view = new RightSidebarColumnsItemView({model: model});
            this._subviews.push(view);
            this.$el.append(view.$el);
        },

        onCheckboxChange: function(model) {
            var selected = this.model.get('selected');
            if(model.get('clicked')) {
                selected = selected.concat(model.get('name'));
            } else {
                selected = _.without(selected, model.get('name'));
            }
            this.model.set('selected', selected);
        }
    });
});