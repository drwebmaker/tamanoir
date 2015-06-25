/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        DialogView = require('view/DialogView'),
        DomainListItemViewTemplate = require('text!template/DomainListItemViewTemplate.html');

    return Backbone.View.extend({
        tagName: 'li',
        events: {
            'click .domain': 'onDomainClick',
            'click .edit': 'onEditClick',
            'click .remove': 'onRemoveClick'
        },
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function () {
            this.$el.html(_.template(DomainListItemViewTemplate)(this.model.toJSON()));
            return this;
        },
        onDomainClick: function () {
            Tamanoir.navigate('library/' + this.model.get('id'), {trigger: true});
        },
        onEditClick: function () {
            Tamanoir.navigate('library/' + this.model.get('id') + '/edit', {trigger: true});
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
        }
    });
});