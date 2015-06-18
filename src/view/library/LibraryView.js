/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DialogView = require('view/component/DialogView'),
        ConnectionSettingsView = require('view/library/ConnectionSettingsView'),
        ConnectionListItemView = require('view/library/ConnectionListItemView'),
        ConnectionModel = require('model/ConnectionModel'),
        ConnectionsCollection = require('collection/ConnectionsCollection'),
        LibraryViewTemplate = require('text!template/library/LibraryViewTemplate.html');

    require('css!styles/library/library');

    return Backbone.View.extend({
        events: {
            'click .newConnectionBtn': 'onNewConnectionBtnClick'
        },
        initialize: function () {
            this.collection = ConnectionsCollection;

            this.listenTo(this.collection, 'update', this.render);
        },
        render: function () {
            this.$el.html(LibraryViewTemplate);
            this.collection.each(this.addConnection, this);
            return this;
        },
        addConnection: function (connectionModel) {
            this.$el.find('ul').append(new ConnectionListItemView({model: connectionModel}).render().$el);
        },
        onNewConnectionBtnClick: function () {
            this.settingsView = new ConnectionSettingsView({
                model: new ConnectionModel()
            });
            this.dialogView = new DialogView({
                title: 'Add Connection',
                content: this.settingsView.render().$el,
                buttons: [{label: 'Add', action: 'add'}]
            }).render();

            this.listenTo(this.dialogView, 'action:add', this.saveConnection);
        },
        saveConnection: function () {
            this.settingsView.model.set(this.settingsView.getValues());
            ConnectionsCollection.add(this.settingsView.model);
            this.settingsView.model.save();
            this.dialogView.remove();
            this.settingsView.remove();
        }
    });
});