/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        TableViewTemplate = require('text!template/TableViewTemplate.html');

    require('css!styles/table');

    return Backbone.View.extend({
        initialize: function (config) {
            this.metadataCollection = config.metadataCollection;
            this.listenTo(this.collection, 'update', this.render);
            this.listenTo(this.metadataCollection, 'update', this.render);
        },
        render: function () {
            this.$el.html(_.template(TableViewTemplate)({
                data: this.collection.toJSON(),
                metadata: this.metadataCollection
            }));
            return this;
        }
    });
});