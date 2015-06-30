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
            'click .foundicon-paper-clip': 'onReferenceClick'
        },
        initialize: function () {
            this.listenTo(this.model, 'loaded', this.render);
        },
        render: function () {
            this.$el.html(_.template(TableViewTemplate)(this.model.toJSON()));
            return this;
        },
        load: function (table) {
            this.model.load(table);
        },
        onReferenceClick: function (event) {
            var foreignKey =  $(event.target).parent().data('referenceTo'),
                originTable = $(event.target).parent().data('belongTo'),
                originKey = originTable + '.' + $(event.target).parent().data('name'),
                foreignTable = foreignKey.slice(0, foreignKey.lastIndexOf('.'));

            this.model.join(originTable, foreignTable, originKey, foreignKey);
        }
    });
});