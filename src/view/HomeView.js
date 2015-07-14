/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        HomeViewTemplate = require('text!template/HomeViewTemplate.html'),
        ConnectionsListView = require('view/ConnectionsListView'),
        DomainsListView = require('view/DomainsListView'),
        PostgreSQLConnectionModel = require('model/PostgreSQLConnectionModel'),
        EditDomainView = require('view/EditDomainView'),
        EditConnectionView = require('view/EditConnectionView');

    return Backbone.View.extend({
        className: 'home-view',
        template: HomeViewTemplate,
        events: {
            'click .newConnection': 'onNewConnectionClick',
            'click [data-datasource-type]': 'onDatasourceTypeClick'
        },
        initialize: function () {
            this.listenTo(Tamanoir, 'connectionsList:connection:edit', this.onEditConnectionClick);
            this.listenTo(Tamanoir, 'domainsList:domain:edit', this.onEditDomainClick);
            this.render();
        },
        render: function () {
            this.$el.html(this.template);
            this.calculateHeight();
            this.$('.home-connections').html(new ConnectionsListView().$el);
            this.$('.home-domains').html(new DomainsListView().$el);
            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                var bodyHeight = $('body').height();

                this.$('.home-sidebar').height(bodyHeight - 40);
                this.$('.home-datasources').height(bodyHeight - 40);
                this.$('.home-datasource-types').height(bodyHeight - 40);
            }.bind(this), 0);
        },
        onNewConnectionClick: function (event) {
            $(event.target).toggleClass('active');
            this.$('.home-datasources').toggleClass('hide');

            this.editConnectionView && this.editConnectionView.remove();
        },
        onDatasourceTypeClick: function (event) {
            var type = $(event.target).data('datasource-type');
            console.log(type, 'datasource type clicked');

            this.editConnectionView = new EditConnectionView({model: new PostgreSQLConnectionModel()});
            this.$('.home-datasource-settings').html(this.editConnectionView.$el);
        },
        onEditConnectionClick: function (model) {
            console.log(model);
            this.editConnectionView = new EditConnectionView({model: model});
            this.$('.home-datasource-settings').html(this.editConnectionView.$el);
        },
        onEditDomainClick: function (model) {
            console.log(model);
            this.editDomainView = new EditDomainView({model: model});
            this.$('.home-datasource-settings').html(this.editDomainView.$el);
        }
    });
});