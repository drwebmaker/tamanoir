/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DialogView = require('view/component/DialogView'),
        DomainSettingsView = require('view/domains/DomainSettingsView'),
        DomainListItemView = require('view/domains/DomainListItemView'),
        DomainModel = require('model/DomainModel'),
        DomainsCollection = require('collection/DomainsCollection'),
        DomainsViewTemplate = require('text!template/domains/DomainsViewTemplate.html');

    require('css!styles/domains/domains');

    return Backbone.View.extend({
        events: {
            'click .newDomain': 'onNewDomainClick'
        },
        initialize: function () {
            this.collection = new DomainsCollection();
            
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
        },
        onNewDomainClick: function () {
            this.settingsView = new DomainSettingsView({
                model: new DomainModel()
            });
            this.dialogView = new DialogView({
                title: 'Add Domain',
                content: this.settingsView.render().$el,
                buttons: [{label: 'Add', action: 'add'}]
            }).render();

            this.listenTo(this.dialogView, 'action:add', this.saveDomain);
        },
        saveDomain: function () {
            this.settingsView.model.set(this.settingsView.getValues());
            this.collection.add(this.settingsView.model);
            this.settingsView.model.save();
            this.dialogView.remove();
            this.settingsView.remove();
        }
    });
});