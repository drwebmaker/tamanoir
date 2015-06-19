/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        DialogView = require('view/component/DialogView'),
        ConnectionSettingsView = require('view/connections/ConnectionSettingsView'),
        ConnectionListItemViewTemplate = require('text!template/connections/ConnectionListItemViewTemplate.html');

    return Backbone.View.extend({
        tagName: 'li',
        events: {
            'click .connection': 'onConnectionClick',
            'click .edit': 'onEditClick',
            'click .remove': 'onRemoveClick'
        },
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(_.template(ConnectionListItemViewTemplate)(this.model.toJSON()));
            return this;
        },
        onConnectionClick: function () {
            Tamanoir.router.navigate('connections/' + this.model.get('name'), {trigger: true});
        },
        onEditClick: function () {
            this.settingsView = new ConnectionSettingsView({model: this.model});
            this.dialogView = new DialogView({
                title: 'Edit',
                content: this.settingsView.render().$el,
                buttons: [
                    {label: 'Save', action: 'save'}
                ]
            }).render();
            this.listenTo(this.dialogView, 'action:save', this.save);
        },
        onRemoveClick: function () {
            this.model.destroy();
        },
        save: function () {
            this.model.save(this.settingsView.getValues());
            this.dialogView.remove();
            this.settingsView.remove();
        }
    });
});