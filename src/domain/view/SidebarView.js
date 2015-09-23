/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ConnectionView = require('domain/view/ConnectionView');

    return Backbone.View.extend({

        className: 'sidebar-view',

        events: {
        },

        initialize: function () {
            this._subviews = [];

            this.render();
        },

        render: function () {
            this.$el.empty();
            //this.collection.each(this.addConnection, this);

            return this;
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