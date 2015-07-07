/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        TableListItemView = require('view/TableListItemView'),
        TableModel = require('model/SchemaModel'),
        TablesViewTemplate = require('text!template/TablesViewTemplate.html');

    return Backbone.View.extend({
        initialize: function () {
            this.render();
        },
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