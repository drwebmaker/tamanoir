/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        DataCanvasView = require('domain/view/DataCanvasView'),
        DataCollection = require('domain/collection/DataCollection'),
        TablesCollection = require('domain/collection/TablesCollection'),
        DomainsCollection = require('common/collection/DomainsCollection'),
        DialogView = require('common/view/DialogView'),
        SidebarView = require('domain/view/SidebarView'),
        TableView = require('domain/view/TableView'),
        DomainDesignerViewTemplate = require('text!domain/template/DomainDesignerViewTemplate.html');

    return Backbone.View.extend({

        className: 'domain-designer-view',
        template: DomainDesignerViewTemplate,
        events: {
            'click .productTitle': 'onProductTitleClick',
            'click .saveDomain': 'onSaveDomainClick'
        },

        initialize: function (attrs, options) {
            this._subviews = [];
            options || (options = {});

            this.domainsCollection = options.domains;

            //TODO: should be placed inside domain model
            this.tablesCollection = new TablesCollection();

            this.dataCollection = new DataCollection();

            this.listenTo(this.tablesCollection, 'change update reset', this.buildQuery);

            this.tablesCollection.reset(this.model.get('tables'));

            this.render();
        },

        render: function () {
            this.$el.html(this.template);

            this.sidebarView = new SidebarView({collection: this.model.connections});
            this.dataCanvasView = new DataCanvasView({collection: this.tablesCollection});
            this.tableView = new TableView({collection: this.dataCollection});

            this.$('.sidebar-container').html(this.sidebarView.$el);
            this.$('.data-canvas-container').html(this.dataCanvasView.$el);
            this.$('.table-container').html(this.tableView.$el);

            this.calculateHeight();

            return this;
        },

        calculateHeight: function () {
            var self = this;

            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    header = self.$('.domain-designer-header'),
                    contentHeight = bodyHeight - header.height();

                self.sidebarView.$el.height(contentHeight);
                self.dataCanvasView.$el.height(contentHeight / 2);
                //12px workaround should be removed
                self.tableView.$el.height(contentHeight / 2 - 12);
            }, 0);
        },

        buildQuery: function () {
            var self = this,
                query = this.tablesCollection.getQuery();

            console.log('query:', query);
            if(!query) return;

            //TODO: provide way to work with multiple connections
            //right now only one connection is supported
            //limit for 100 record
            this.model.connections.first().query(query + ' LIMIT 100').then(function (data) {
                self.dataCollection.reset(data);
            });
        },

        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        },

        onSaveDomainClick: function (event) {
            if (this.model.isNew()) {
                var dialogView = new DialogView({
                    title: 'Save domain',
                    content: $('<input type="text" placeholder="name" name="name"/>'),
                    buttons: [{label: 'save', action: 'save'}]
                }).render();
                this.listenToOnce(dialogView, 'action:save', function () {
                    var name = dialogView.$('input').val();
                    if (name) {
                        var domain = this.domainsCollection.create({
                            name: name,
                            tables: this.tablesCollection.toJSON()
                        }, {
                            connections: this.model.connections
                        });

                        Tamanoir.navigate('domain/' + domain.get('id'));
                    }
                }.bind(this));
            } else {
                this.model.save({
                    tables: this.tablesCollection.toJSON()
                }).done(function () {
                    DialogView.showMessage('Saved');
                });
            }
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});