/**
 * Created by Artem.Malieiev on 6/16/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        QueryResultsCollection = require('collection/QueryResultsCollection'),
        SidebarViewTemplate = require('text!template/designer/SidebarViewTemplate.html');

    require('css!styles/designer/sidebar');

    return Backbone.View.extend({
        events: {
            'click li': 'onItemClick'
        },
        initialize: function () {
            this.listenTo(QueryResultsCollection, 'reset', this.render);
        },
        render: function () {
            this.$el.html(_.template(SidebarViewTemplate)({
                categories: this._getCategories(),
                numbers: this._getNumbers()
            }));
            this._getCategories();
            return this;
        },
        onItemClick: function (event) {
            $(event.target).toggleClass('active');
        },
        _getCategories: function () {
            var categories = [];
            _.each(QueryResultsCollection.toJSON()[0], function (value, key) {
                if (!$.isNumeric(value)) {
                    categories.push(key);
                }
            });
            return categories;
        },
        _getNumbers: function () {
            var numbers = [];
            _.each(QueryResultsCollection.toJSON()[0], function (value, key) {
                if ($.isNumeric(value)) {
                    numbers.push(key);
                }
            });
            return numbers;
        }
    });
});