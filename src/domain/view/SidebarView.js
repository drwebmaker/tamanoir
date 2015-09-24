/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ConnectionView = require('domain/view/ConnectionView'),
        ElementsCollection = require('domain/collection/ElementsCollection'),
        GroupModel = require('domain/model/GroupModel'),
        GroupView = require('domain/view/GroupView');

    return Backbone.View.extend({

        className: 'sidebar-view',

        template: _.template('<ul></ul>'),

        events: {
        },

        initialize: function () {
            this._subviews = [];

            this.listenTo(this.collection, 'update', this.render);

            this.render();
        },

        render: function () {
            this.$el.empty();
            this.$el.html( this.template() );
            this.collection.each(this.getMetadata, this);


            return this;
        },

        getMetadata: function(model) {

            var elementsCollection = new ElementsCollection( model.get('metadata').elements );
            var nameMetadata = model.get('metadata').name;

            var groupModel = new GroupModel({ name: nameMetadata, elements: elementsCollection });

            var groupView = new GroupView({ model: groupModel });

            $('ul').append(groupView.render().el);
        },

        addConnection: function (connectionModel) {
            var connectionView = new ConnectionView({model: connectionModel});

            this.$el.append(connectionView.$el);
            this._subviews.push(connectionView);
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});