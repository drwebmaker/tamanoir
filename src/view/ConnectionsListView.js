/**
 * Created by Artem.Malieiev on 7/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        ConnectionsCollection = require('collection/ConnectionsCollection'),
        ConnectionListItemView = require('view/ConnectionListItemView'),
        ConnectionsListViewTemplate = require('text!template/ConnectionsListViewTemplate.html');

    return Backbone.View.extend({
        className: 'connections-list-view',
        template: ConnectionsListViewTemplate,
        initialize: function () {
            this.collection = new ConnectionsCollection();

            this.listenTo(this.collection, 'sync', this.onConnectionsSync);

            this.collection.fetch();
        },
        render: function () {
            this.$el.html(this.template);
            this.collection.each(this.addConnection, this);
            return this;
        },
        addConnection: function (model) {
            this.$('ul').append(new ConnectionListItemView({model: model}).$el);
        },
        onConnectionsSync: function () {
            this.render();
        }
    });
});