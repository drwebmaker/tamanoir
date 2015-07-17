/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        TableViewTemplate = require('text!template/TableViewTemplate.html');

    return Backbone.View.extend({
        className: 'table-view',
        template: _.template(TableViewTemplate),
        events: {
            'click th div': 'onTableHeaderClick',
            'dragstart th div': 'onTableHeaderDragStart'
        },
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
            this.render();
        },
        render: function () {
            this.calculateHeight();

            this.$el.html(this.template({
                data: this.collection.toJSON()
            }));

            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                this.$('.inner').height($('.bottom-section').height() - 30);
            }.bind(this), 0);
        },
        onTableHeaderClick: function (event) {
            var value = $(event.target).text().trim();

            if (this.reverse) {
                this.collection.reset(this.collection.sortBy(value).reverse());
                this.reverse = false;
            } else {
                this.collection.reset(this.collection.sortBy(value));
                this.reverse = true;
            }
        },
        onTableHeaderDragStart: function (event) {
            var name = $(event.target).text().trim(),
                data = this.collection.map(function (model) {
                    return model.get(name);
                });
            console.log('dragstart', name, data);
            Tamanoir.trigger('table:header:dragstart', name, data);
        }
    });
});