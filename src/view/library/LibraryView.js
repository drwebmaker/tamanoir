/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        DialogView = require('view/component/DialogView'),
        ConnectionSettingsView = require('view/library/ConnectionSettingsView'),
        ConnectionListItemViewTemplate = require('text!template/library/ConnectionListItemViewTemplate.html'),
        ConnectionModel = require('model/ConnectionModel'),
        ConnectionsCollection = require('collection/ConnectionsCollection'),
        LibraryViewTemplate = require('text!template/library/LibraryViewTemplate.html');

    require('css!styles/library/library');

    return Backbone.View.extend({
        connectionTemplate: ConnectionListItemViewTemplate,
        events: {
            'click li .connection': 'onConnectionClick',
            'click li .foundicon-trash': 'onRemoveConnectionClick',
            'click li .foundicon-settings': 'onEditConnectionClick',
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
            this.$el.find('ul').append(_.template(this.connectionTemplate)(connectionModel.toJSON()));
        },
        onConnectionClick: function (event) {
            var connectionName = $(event.target).data('name');
            Tamanoir.router.navigate('library/' + connectionName, {trigger: true});
        },
        onNewConnectionBtnClick: function (event) {
            this.connectionSettings = new ConnectionSettingsView({
                model: new ConnectionModel()
            });
            this.dialog = new DialogView({
                title: 'Add Connection',
                content: this.connectionSettings.render().$el
            }).render();

            this.listenTo(this.dialog, 'action:ok', this.saveConnection);
        },
        onRemoveConnectionClick: function (event) {
            var connectionModel = ConnectionsCollection.find(function (model) {
                return model.get('name') === $(event.target).data('name');
            });

            connectionModel.destroy();
        },
        onEditConnectionClick: function () {
            var connectionModel = ConnectionsCollection.find(function (model) {
                return model.get('name') === $(event.target).data('name');
            });

            this.connectionSettings = new ConnectionSettingsView({
                model: connectionModel
            });

            this.dialog = new DialogView({
                title: 'Edit Connection',
                content: this.connectionSettings.render().$el
            }).render();

            this.listenTo(this.dialog, 'action:ok', _.bind(function () {
                this.connectionSettings.model.save(this.connectionSettings.getValues());
                this.dialog.remove();
                this.render();
            }, this));
        },
        saveConnection: function () {
            this.connectionSettings.model.set(this.connectionSettings.getValues());
            ConnectionsCollection.add(this.connectionSettings.model);
            this.connectionSettings.model.save();
            this.dialog.remove();
        }
    });
});