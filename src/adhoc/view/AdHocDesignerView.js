/**
 * Created by Artem on 9/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        DataCollection = require('domain/collection/DataCollection'),
        DomainModel = require('common/model/DomainModel'),
        TablesCollection = require('domain/collection/TablesCollection'),
        SidebarView = require('adhoc/view/SidebarView'),
        DialogView = require('common/view/DialogView'),
        TableView = require('domain/view/TableView'),
        AdHocDesignerViewTemplate = require('text!adhoc/template/AdHocDesignerViewTemplate.html');

    return Backbone.View.extend({

        className: 'adhoc-view',
        template: AdHocDesignerViewTemplate,
        events: {
            'click .productTitle': 'onProductTitleClick'
        },

        initialize: function () {
            this._subviews = [];

            this.domain = new DomainModel(this.model.get('domain'));
            //TODO: should be placed inside domain model
            this.tablesCollection = new TablesCollection();

            this.dataCollection = new DataCollection();

            this.listenTo(this.tablesCollection, 'change update reset', this.buildQuery);

            this.tablesCollection.reset(this.model.get('domain').tables);

            this.render();
        },

        render: function () {
            this.$el.html(this.template);

            this.tableView = new TableView({collection: this.dataCollection});
            this.sidebarView = new SidebarView({model: this.model, collection: this.tablesCollection});
            this.chartView = new Backbone.View();

            this.$('.sidebar-container').html(this.sidebarView.$el);
            this.$('.chart-container').html(this.chartView.$el);
            this.$('.table-container').html(this.tableView.$el);

            this.calculateHeight();

            return this;
        },

        calculateHeight: function () {
            var self = this;

            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    header = self.$('.adhoc-header'),
                    contentHeight = bodyHeight - header.height();

                self.sidebarView.$el.height(contentHeight);
                self.chartView.$el.height(contentHeight / 2);
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
            this.domain.connections.first().query(query + ' LIMIT 100').then(function (data) {
                self.dataCollection.reset(data);
            });
        },

        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});