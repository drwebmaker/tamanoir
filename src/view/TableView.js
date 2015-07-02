/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        TableViewTemplate = require('text!template/TableViewTemplate.html');

    require('css!styles/table');

    return Backbone.View.extend({
        className: 'tableView',
        events: {
            'click .foundicon-paper-clip': 'onReferenceClick',
            'click .foundicon-remove': 'onRemoveColumnClick'
        },
        initialize: function (config) {
            this.columnsCollection = config.columnsCollection;

            this.listenTo(this.model, 'loaded', this.render);
            this.listenTo(this.model, 'change:columns', this.render);
            this.listenTo(this.columnsCollection, 'change', this.onColumnsCollectionChange);
        },
        render: function () {
            this.$el.html(_.template(TableViewTemplate)(this.model.toJSON()));
            return this;
        },
        load: function (table) {
            this.model.load(table);
        },
        onReferenceClick: function (event) {
            var foreignKey = $(event.target).parent().data('referenceTo'),
                originTable = $(event.target).parent().data('belongTo'),
                originKey = originTable + '.' + $(event.target).parent().data('name'),
                foreignTable = foreignKey.slice(0, foreignKey.lastIndexOf('.'));

            this.model.join(originTable, foreignTable, originKey, foreignKey);
        },
        onRemoveColumnClick: function () {
            var name = $(event.target).parent().data('name');
            this.columnsCollection.get(name).set('hidden', true);
        },

        onColumnsCollectionChange: function () {
            this.model.set('columns', _.chain(this.columnsCollection.toJSON())
                .filter(function (value) {
                    return !value.hidden;
                })
                .pluck('name')
                .value());
        }
    });
});