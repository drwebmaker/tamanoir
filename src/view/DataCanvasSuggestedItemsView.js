/**
 * Created by valeriy.abornyev on 8/26/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        DataCanvasSuggestedItemViewTemplate = require('text!template/DataCanvasSuggestedItemViewTemplate');

    return Backbone.View.extend({
        tagName: 'li',

        initialize: function () {
            this.render();
        },

        render: function() {
            this.$el.html(_.template(DataCanvasSuggestedItemViewTemplate)(this.model.toJSON()));
        }
    });
});