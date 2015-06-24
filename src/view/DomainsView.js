/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainListItemView = require('view/DomainListItemView'),
        DomainModel = require('model/DomainModel'),
        DomainsCollection = require('collection/DomainsCollection'),
        DomainsViewTemplate = require('text!template/DomainsViewTemplate.html');

    require('css!styles/domains');

    return Backbone.View.extend({
        initialize: function () {
            this.collection = new DomainsCollection();
            this.collection.fetch({reset: true});
            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'add', this.addDomain);
        },
        render: function () {
            this.$el.html(DomainsViewTemplate);
            this.collection.each(this.addDomain, this);
            return this;
        },
        addDomain: function (domainModel) {
            this.$el.find('ul').append(new DomainListItemView({model: domainModel}).render().$el);
        }
    });
});