/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        ConnectionCollection = require('collection/ConnectionsCollection'),
        LibraryViewTemplate = require('text!template/library/LibraryViewTemplate.html');

    require('css!styles/library/library');

    return Backbone.View.extend({
        className: 'library',
        connectionTemplate: '<li data-name="{{- name }}">{{- name }}</li>',
        events: {
            'click li': 'connectionClickHandler'
        },
        initialize: function () {
            this.collection = new ConnectionCollection([ //TODO: remove hardcoded data
                {type: 'jdbc', name: 'jasperserver', url: 'jdbc:postgresql://localhost:5432/jasperserver', properties: {user: 'postgres', password: 'postgres'}},
                {type: 'csv', name: 'sales', url: 'file:///C:/Users/artem.malieiev/Downloads/sales.csv', properties: {useFirstRowAsHeader: true}}
            ]);
        },
        render: function () {
            this.$el.html(LibraryViewTemplate);
            this.collection.each(this.addConnection, this);
            return this;
        },
        addConnection: function (connectionModel) {
            this.$el.find('ul').append(_.template(this.connectionTemplate)(connectionModel.toJSON()));
        },
        connectionClickHandler: function (event) {
            var connectionModel = this.collection.find(function (model) {
                return model.get('name') === $(event.target).data('name');
            });
            this.trigger('connectionSelected', connectionModel);
        }
    });
});