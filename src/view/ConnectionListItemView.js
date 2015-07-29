/**
 * Created by Artem.Malieiev on 7/10/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        ConnectionListItemViewTemplate = require('text!template/ConnectionListItemViewTemplate.html');

    return Backbone.View.extend({
        className: 'connections-list-item-view',
        tagName: 'li',
        events: {
            'click .connection': 'onConnectionClick',
            'click .edit': 'onEditConnectionClick',
            'click .delete': 'onDeleteConnectionClick'
        },
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.render();
        },
        render: function () {
            this.$el.html(_.template(ConnectionListItemViewTemplate)(this.model.toJSON()));
            return this;
        },
        onConnectionClick: function () {
            Tamanoir.navigate('connection/' + this.model.get('id'), {trigger: true});
        },
        onDeleteConnectionClick: function () {
            this.model.destroy();
        },
        onEditConnectionClick: function () {
            Tamanoir.trigger('connectionsList:connection:edit', this.model);
        }
    });
});