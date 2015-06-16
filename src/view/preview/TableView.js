/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        TableViewTemplate = require('text!template/preview/TableViewTemplate.html');

    require('css!styles/preview/table');

    return Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html(_.template(TableViewTemplate)({
                data: this.collection.toJSON()
            }));
            return this;
        }
    });
});