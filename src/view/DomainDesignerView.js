/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ConnectionsCollection = require('collection/ConnectionsCollection'),
        DomainDesignerViewTemplate = require('text!template/DomainDesignerViewTemplate.html');

    return Backbone.View.extend({
        className: 'domain-designer-view',
        template: DomainDesignerViewTemplate,
        initialize: function (config) {
            this.config = config || {};
            this.connectionsCollection = new ConnectionsCollection();

            this.listenTo(this.connectionsCollection, 'sync', this.onConnectionsSync);

            this.connectionsCollection.fetch();
        },
        render: function () {
            this.$el.html(this.template);
            return this;
        },
        onConnectionsSync: function () {
            console.log(this.connectionsCollection);
            this.render();
        }
    });
});