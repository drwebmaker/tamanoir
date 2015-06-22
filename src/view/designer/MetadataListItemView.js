/**
 * Created by Artem.Malieiev on 6/22/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        MetadataListItemViewTemplate = require('text!template/designer/MetadataListItemViewTemplate.html');

    return Backbone.View.extend({
        tagName: 'li',
        render: function () {
            this.$el.html(_.template(MetadataListItemViewTemplate)(this.model.toJSON()));
            return this;
        }
    });
});