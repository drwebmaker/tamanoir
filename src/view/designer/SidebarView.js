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
                categories: QueryResultsCollection.getCategoriesNames(),
                numbers: QueryResultsCollection.getNumbersNames()
            }));
            return this;
        },
        onItemClick: function (event) {
        },
    });
});