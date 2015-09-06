/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        TableViewTemplate = require('text!domain/template/TableViewTemplate.html');

    return Backbone.View.extend({
        className: 'table-view',
        events: {
            'click th div': 'onTableHeaderClick',
            'dragstart th div': 'onTableHeaderDragStart',
            'scroll': 'onScroll'
        },
        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
            this.render();
        },
        render: function () {
            this.calculateHeight();

            this.$el.html(_.template(TableViewTemplate)({
                data: this.collection.toJSON()
            }));

            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                this.$el.height($('.bottom-section').height() - 14);
                this.onScroll();
            }.bind(this), 10);
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
        },
        onScroll: function (event) {
            this.$('.inner').css({
                top: this.$el.scrollTop()
            });

            this.$('.header').css({
                top: this.$el.scrollTop(),
                left: this.$el.scrollLeft()
            });
        }
    });
});