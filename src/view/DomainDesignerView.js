/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ConnectionsCollection = require('collection/ConnectionsCollection'),
        TablesView = require('view/TablesView'),
        DomainDesignerViewTemplate = require('text!template/DomainDesignerViewTemplate.html');

    return Backbone.View.extend({
        className: 'domain-designer-view',
        template: DomainDesignerViewTemplate,
        events: {
            'click .domain-designer-title': 'onProductTitleClick'
        },
        initialize: function (config) {
            this.config = config || {};
            this.connectionModel = null;
            this.connectionsCollection = new ConnectionsCollection();
            this.tablesCollection = new Backbone.Collection();

            this.listenTo(this.connectionsCollection, 'sync', this.onConnectionsSync);

            this.connectionsCollection.fetch();
        },
        render: function () {
            this.$el.html(this.template);
            this.calculateHeight();

            this.$('.sidebar').html(new TablesView({
                database: this.connectionModel.get('database'),
                collection: this.tablesCollection
            }).$el);
            return this;
        },
        onConnectionsSync: function () {
            this.connectionModel = this.connectionsCollection.get(this.config.connectionId);
            Tamanoir.connecion = this.connectionModel; //Just for debug

            this.connectionModel.getTables().then(function (tables) {
                this.tablesCollection.reset(tables);
            }.bind(this));

            this.render();
        },
        calculateHeight: function () {
            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    sectionHeight = Math.round((bodyHeight - 40) / 3);

                this.$('.top-section').height(sectionHeight);
                this.$('.middle-section').height(sectionHeight);
                this.$('.bottom-section').height(bodyHeight - sectionHeight * 2 - 40);
            }.bind(this), 0);
        },
        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        }
    });
});