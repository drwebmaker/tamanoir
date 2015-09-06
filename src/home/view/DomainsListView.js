/**
 * Created by Artem.Malieiev on 7/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainsCollection = require('common/collection/DomainsCollection'),
        DomainListItemView = require('home/view/DomainListItemView'),
        DomainsListViewTemplate = require('text!home/template/DomainsListViewTemplate.html');

    return Backbone.View.extend({
        className: 'domains-list-view',
        template: DomainsListViewTemplate,
        initialize: function () {
            this.collection = new DomainsCollection();

            this.listenTo(this.collection, 'sync', this.onDomainsSync);

            this.collection.fetch();
        },
        render: function () {
            this.$el.html(this.template);
            this.collection.each(this.addDomain, this);
            return this;
        },
        addDomain: function (model) {
            this.$('ul').append(new DomainListItemView({model: model}).$el);
        },
        onDomainsSync: function () {
            this.render();
        }
    });
});