/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        DialogView = require('view/component/DialogView'),
        DomainSettingsView = require('view/domains/DomainSettingsView'),
        DomainListItemViewTemplate = require('text!template/domains/DomainListItemViewTemplate.html');

    return Backbone.View.extend({
        tagName: 'li',
        events: {
            'click .domain': 'onDomainClick',
            'click .edit': 'onEditClick',
            'click .remove': 'onRemoveClick'
        },
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(_.template(DomainListItemViewTemplate)(this.model.toJSON()));
            return this;
        },
        onDomainClick: function () {
            Tamanoir.router.navigate('domains/' + this.model.get('name'), {trigger: true});
        },
        onEditClick: function () {
            this.settingsView = new DomainSettingsView({model: this.model});
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
            this.deletingDialog = new DialogView({
                title: 'Delete',
                content: 'Are you sure, that you want delete ' + this.model.get('name'),
                buttons: [
                    {label: 'Yes', action: 'yes'},
                    {label: 'No', action: 'no'}
                ]
            }).render();
            this.listenTo(this.deletingDialog, 'action:yes', this.onDeleteConfirmed);
            this.listenTo(this.deletingDialog, 'action:no', this.onDeleteCanceled);
        },
        onDeleteConfirmed: function () {
            this.deletingDialog.remove();
            this.model.destroy();
        },
        onDeleteCanceled: function () {
            this.deletingDialog.remove();
        },
        save: function () {
            this.model.save(this.settingsView.getValues());
            this.dialogView.remove();
            this.settingsView.remove();
        }
    });
});