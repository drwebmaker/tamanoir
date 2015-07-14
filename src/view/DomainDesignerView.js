/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        PostgreSQLConnectionModel = require('model/PostgreSQLConnectionModel'),
        TablesView = require('view/TablesView'),
        DataCanvasView = require('view/DataCanvasView'),
        DomainsCollection = require('collection/DomainsCollection'),
        DataCanvasItemsCollection = require('collection/DataCanvasItemsCollection'),
        TableView = require('view/TableView'),
        DomainDesignerViewTemplate = require('text!template/DomainDesignerViewTemplate.html');

    return Backbone.View.extend({
        className: 'domain-designer-view',
        template: DomainDesignerViewTemplate,
        events: {
            'click .domain-designer-title': 'onProductTitleClick',
            'click .analysis': 'onAnalysisClick',
            'click .saveDomain': 'onSaveDomainClick',
            'click .data-canvas-view': 'onDataCanvasClick'
        },
        initialize: function () {
            this.domainsCollection = new DomainsCollection();
            this.tablesCollection = new Backbone.Collection();
            this.tableDataCollection = new Backbone.Collection();
            this.dataCanvasItemsCollection = new DataCanvasItemsCollection();

            this.listenTo(this.dataCanvasItemsCollection, 'change update reset', this.onCanvasItemsChange);
            this.listenTo(Tamanoir, 'tables:table:click', this.onSidebarTableClick);

            if (this.model.isNew()) {
                this.connectionModel = new PostgreSQLConnectionModel({id: this.model.get('connectionId')});
                this.listenTo(this.connectionModel, 'sync', this.onConnectionSync);
                this.connectionModel.fetch();
            } else {
                this.listenToOnce(this.model, 'sync', this.onDomainModelSync);
                this.model.fetch();
            }
        },
        render: function () {
            this.$el.html(this.template);
            this.calculateHeight();

            this.$('.sidebar').html(new TablesView({
                database: this.connectionModel.get('database'),
                collection: this.tablesCollection
            }).$el);


            this.dataCanvas = new DataCanvasView({collection: this.dataCanvasItemsCollection});
            this.dataCanvasItemsCollection.reset(this.model.get('data'));

            this.$('.data-canvas-holder').html(this.dataCanvas.$el);
            this.$('.bottom-section .table-holder').html(new TableView({collection: this.tableDataCollection}).$el);

            return this;
        },
        onConnectionSync: function () {
            Tamanoir.connecion = this.connectionModel; //Just for debug

            this.connectionModel.getTables().then(function (tables) {
                this.tablesCollection.reset(tables);
            }.bind(this));

            this.render();
        },
        onDomainModelSync: function () {
            this.connectionModel = new PostgreSQLConnectionModel({id: this.model.get('connectionId')});
            this.listenTo(this.connectionModel, 'sync', this.onConnectionSync);
            this.connectionModel.fetch();
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
            this.connectionModel.query('SELECT * FROM ' + table.get('name') + ' LIMIT 100').then(function (data) {
                this.tableDataCollection.reset(data);
            }.bind(this));
        },
        onCanvasItemsChange: function () {
            console.log(this.dataCanvas.getQuery());

            if (this.dataCanvasItemsCollection.size() === 0) {
                this.tableDataCollection.reset([]);
                return;
            }

            this.connectionModel.query(this.dataCanvas.getQuery()).then(function (data) {
                this.tableDataCollection.reset(data);
            }.bind(this));
        },
        onAnalysisClick: function () {
            console.log('analysis button click');
            Tamanoir.navigate('connection/' + this.model.get('connectionId') + '/' + this.dataCanvas.serialize());
        },
        onDataCanvasClick: function (event) {
            if (event.target === this.dataCanvas.el) {
                console.log('data canvas click');
                this.onCanvasItemsChange();
            }
        },
        onSaveDomainClick: function (event) {
            var name;
            if (this.model.isNew()) {
                name = prompt('input domain name');
            } else {
                name = this.model.get('name');
            }
            this.model.save({
                name: name,
                data: this.dataCanvasItemsCollection.toJSON()
            }, {
                success: function (model) {
                    Tamanoir.navigate('connection/' + model.get('connectionId') + '/' + model.get('id'));
                }
            })
        }
    });
});