/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainListItemView = require('view/library/DomainListItemView'),
        DomainModel = require('model/DomainModel'),
        DomainsViewTemplate = require('text!template/library/DomainsViewTemplate.html');

    require('css!styles/domains/domains');

    return Backbone.View.extend({
        initialize: function () {
            this.collection.fetch();
            this.listenTo(this.collection, 'update', this.render);
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