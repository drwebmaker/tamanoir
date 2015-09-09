/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ColumnViewTemplate = require('text!adhoc/template/ColumnViewTemplate.html');

    return Backbone.View.extend({

        template: _.template(ColumnViewTemplate),
        className: 'column-view',

        events: {
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
});