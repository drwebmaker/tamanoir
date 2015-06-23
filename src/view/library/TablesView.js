/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        TableListItemView = require('view/library/TableListItemView'),
        TableModel = require('model/SchemaModel'),
        TablesViewTemplate = require('text!template/library/TablesViewTemplate.html');

    require('css!styles/domains/domains');

    return Backbone.View.extend({
        render: function () {
            this.$el.html(TablesViewTemplate);
            this.collection.each(this.addTable, this);
            return this;
        },
        addTable: function (tableModel) {
            this.$el.find('ul').append(new TableListItemView({model: tableModel}).render().$el);
        }
    });
});