/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ConnectionsCollection = require('collection/ConnectionsCollection'),
        TablesView = require('view/TablesView'),
        DataCanvasView = require('view/DataCanvasView'),
        TableView = require('view/TableView'),
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
            this.tableDataCollection = new Backbone.Collection();

            this.listenTo(this.connectionsCollection, 'sync', this.onConnectionsSync);
            this.listenTo(Tamanoir, 'tables:table:click', this.onSidebarTableClick);

            this.connectionsCollection.fetch();
        },
        render: function () {
            this.$el.html(this.template);
            this.calculateHeight();

            this.$('.sidebar').html(new TablesView({
                database: this.connectionModel.get('database'),
                collection: this.tablesCollection
            }).$el);


            this.dataCanvas= new DataCanvasView();

            this.$('.data-canvas-holder').html(this.dataCanvas.$el);
            this.$('.bottom-section .table-holder').html(new TableView({collection: this.tableDataCollection}).$el);

            this.listenTo(this.dataCanvas, 'canvasitems:change', this.onCanvasItemsChange);

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
                    sectionHeight = Math.round((bodyHeight - 40) / 2);

                this.$('.top-section').height(sectionHeight);
                this.$('.bottom-section').height(bodyHeight - sectionHeight - 40);
            }.bind(this), 0);
        },
        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        },
        onSidebarTableClick: function (table) {
            console.log('table clicked', table);
            this.connectionModel.query('SELECT * FROM ' + table.get('name') + ' LIMIT 1000').then(function (data) {
                this.tableDataCollection.reset(data);
            }.bind(this));
        },
        onCanvasItemsChange: function () {
            console.log(this.dataCanvas.getQuery());
            this.connectionModel.query(this.dataCanvas.getQuery()).then(function (data) {
                this.tableDataCollection.reset(data);
            }.bind(this));
        }
    });
});