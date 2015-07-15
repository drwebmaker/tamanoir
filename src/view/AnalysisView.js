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
        AnalysisSidebarView = require('view/AnalysisSidebarView'),
        AnalysisViewTemplate = require('text!template/AnalysisViewTemplate.html');

    return Backbone.View.extend({
        className: 'analysis-view',
        template: _.template(AnalysisViewTemplate),
        events: {
            'click .editDomain': 'onEditDomainClick',
            'click .analysis-title': 'onProductTitleClick'
        },
        initialize: function () {
            this._subviews = [];

            this.tableDataCollection = new Backbone.Collection();
            this.columnsCollection = new ColumnsCollection();
            this.domainsCollection = new DomainsCollection();
            this.dataCanvasItemsCollection = new DataCanvasItemsCollection();

            this.model.collection = this.domainsCollection;

            this.listenTo(this.model, 'sync', this.onDomainSync);

            this.model.fetch();

            this.render();
        },
        render: function () {
            this.$el.html(this.template());

            this.analysisSidebarView = new AnalysisSidebarView({collection: this.columnsCollection});
            this.tableView = new TableView({collection: this.tableDataCollection});

            this.calculateHeight();

            this._subviews.push(this.analysisSidebarView);
            this._subviews.push(this.tableView);

            this.$('.top-section .sidebar-holder').html(this.analysisSidebarView.$el);
            this.$('.bottom-section .table-holder').html(this.tableView.$el);

            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    sectionHeight = Math.round((bodyHeight - 40) / 2);

                this.$('.top-section').height(sectionHeight);
                this.$('.analysis-sidebar-view').height(sectionHeight);
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
            this.model.connection.query(this.dataCanvasItemsCollection.getQuery()).then(function (data) {
                this.tableDataCollection.reset(data);
                this.columnsCollection.prepare(data);
            }.bind(this));
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});