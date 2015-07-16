/**
 * Created by Artem.Malieiev on 7/14/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        TableView = require('view/TableView'),
        DomainsCollection = require('collection/DomainsCollection'),
        DataCanvasItemsCollection = require('collection/DataCanvasItemsCollection'),
        ColumnsCollection = require('collection/ColumnsCollection'),
        FiltersView = require('view/FiltersView'),
        FiltersCollection = require('collection/FiltersCollection'),
        GroupsView = require('view/GroupsView'),
        GroupsCollection = require('collection/GroupsCollection'),
        AnalysisSidebarView = require('view/AnalysisSidebarView'),
        AnalysisViewTemplate = require('text!template/AnalysisViewTemplate.html');

    return Backbone.View.extend({
        className: 'analysis-view',
        template: _.template(AnalysisViewTemplate),
        events: {
            'click .editDomain': 'onEditDomainClick',
            'click .analysis-title': 'onProductTitleClick',
            'click .table-view td': 'onCellClick',
            'click .table-view th div': 'onTableHeaderClick'
        },
        initialize: function () {
            this._subviews = [];

            this.tableDataCollection = new Backbone.Collection();
            this.columnsCollection = new ColumnsCollection();
            this.domainsCollection = new DomainsCollection();
            this.filtersCollection = new FiltersCollection();
            this.groupsCollection = new GroupsCollection();
            this.dataCanvasItemsCollection = new DataCanvasItemsCollection();

            this.model.collection = this.domainsCollection;

            this.listenTo(this.model, 'sync', this.onDomainSync);
            this.listenTo(this.filtersCollection, 'update', this.onConditionsUpdate);
            this.listenTo(this.groupsCollection, 'update', this.onConditionsUpdate);

            this.model.fetch();

            this.render();
        },
        render: function () {
            this.$el.html(this.template());

            this.analysisSidebarView = new AnalysisSidebarView({collection: this.columnsCollection});
            this.tableView = new TableView({collection: this.tableDataCollection});
            this.filtersView = new FiltersView({collection: this.filtersCollection});
            this.groupsView = new GroupsView({collection: this.groupsCollection});

            this.calculateHeight();

            this._subviews.push(this.analysisSidebarView);
            this._subviews.push(this.filtersView);
            this._subviews.push(this.tableView);
            this._subviews.push(this.groupsView);

            this.$('.top-section .sidebar-holder').html(this.analysisSidebarView.$el);
            this.$('.top-section .conditions-holder').append(this.filtersView.$el);
            this.$('.top-section .conditions-holder').append(this.groupsView.$el);
            this.$('.bottom-section .table-holder').html(this.tableView.$el);

            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    sectionHeight = Math.round((bodyHeight - 40) / 2);

                this.$('.top-section').height(sectionHeight);
                this.$('.analysis-sidebar-view').height(sectionHeight);
                this.$('.filters-view').height(sectionHeight / 2);
                this.$('.groups-view').height(sectionHeight / 2);
                this.$('.bottom-section').height(bodyHeight - sectionHeight - 40);
            }.bind(this), 0);
        },
        onEditDomainClick: function () {
            if (this.model.get('id')) {
                Tamanoir.navigate('connection/' + this.model.get('connectionId') + '/' + this.model.get('id'), {trigger: true});
            } else {
                Tamanoir.navigate('connection/' + this.model.get('connectionId'), {trigger: true});
            }
        },
        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        },
        onDomainSync: function () {
            console.log('domain sync');
            this.dataCanvasItemsCollection.reset(this.model.get('data'));
            this.model.connection.query(this.dataCanvasItemsCollection.getQuery() + ' LIMIT 100').then(function (data) {
                this.tableDataCollection.reset(data);
                this.columnsCollection.prepare(data);
            }.bind(this));
        },
        onCellClick: function (event) {
            console.log('cell click', event);

            var index = $(event.target).index(),
                name = $(this.$('th')[index]).find('div').text().trim(),
                value = $(event.target).text();

            this.filtersCollection.add({name: name, value: value});
        },
        onConditionsUpdate: function () {
            var filters = this.filtersCollection.getConditions(),
                query;

            filters = filters ? ' AND ' + filters : '';

            query = this.dataCanvasItemsCollection.getQuery() + filters + ' LIMIT 100';
            console.log('filters changed', query);

            this.model.connection.query(query).then(function (data) {
                this.tableDataCollection.reset(data);
            }.bind(this));
        },
        onTableHeaderClick: function (event) {
            var value = $(event.target).text().trim();
            console.log('table header click', value);

            this.groupsCollection.add({value: value});
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});