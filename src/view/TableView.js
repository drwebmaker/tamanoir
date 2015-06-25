/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        TableViewTemplate = require('text!template/TableViewTemplate.html');

    require('css!styles/table');

    return Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'add', this.render);
        },
        render: function () {
            this.$el.html(_.template(TableViewTemplate)({
                data: this.collection.toJSON()
            }));
            return this;
        }
    });
});