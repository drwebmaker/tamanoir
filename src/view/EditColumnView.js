/**
 * Created by Artem.Malieiev on 7/3/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ColumnsCollection = require('collection/ColumnsCollection'),
        EditColumnViewTemplate = require('text!template/EditColumnViewTemplate.html');

    require('css!styles/editColumn');

    return Backbone.View.extend({
        className: 'editColumn',
        template: _.template(EditColumnViewTemplate),
        events: {
            'change select[name="table"]': 'onTableChange',
            'change select[name="column"]': 'onColumnChange',
            'click .close': 'remove',
            'click .save': 'save'
        },
        initialize: function () {
            this.table = this.model.getForeignTableName();
            this.column = this.model.getForeignColumnName();

            this.columnsCollection = new ColumnsCollection();
            this.columnsCollection.fetch();

            Tamanoir.metadataExplorer.getMetadata('public').then(_.bind(this.onTablesMetadataLoaded, this));
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        onTablesMetadataLoaded: function (metadata) {
            this.tables = metadata.items;
            if (this.table) {
                Tamanoir.metadataExplorer.getMetadata('public.' + this.table).then(_.bind(this.onColumnsMetadataLoaded, this));
            } else {
                this.render();
            }
        },
        onTableChange: function (event) {
            this.table = $(event.target).val();
            Tamanoir.metadataExplorer.getMetadata('public.' + this.table).then(_.bind(this.onColumnsMetadataLoaded, this));
        },
        onColumnChange: function (event) {
            this.column = $(event.target).val();
        },
        onColumnsMetadataLoaded: function (metadata) {
            this.columns = metadata.items;
            this.render();
        },
        save: function () {
            console.log('save clicked', this.table, this.column);
            this.model.save({
                referenceTo: 'public.' + this.table + '.' + this.column
            });
            this.columnsCollection.create({
                name: this.column,
                belongTo: 'public.' + this.table,
                fullName: 'public.' + this.table + '.' + this.column,
                referenceTo: this.model.get('belongTo') + '.' + this.model.get('name')
            });
            this.remove();
        }
    });
});