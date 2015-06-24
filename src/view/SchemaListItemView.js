/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        SchemaListItemViewTemplate = require('text!template/SchemaListItemViewTemplate.html');

    return Backbone.View.extend({
        tagName: 'li',
        events: {
            'click': 'onSchemaClick'
        },
        render: function () {
            this.$el.html(_.template(SchemaListItemViewTemplate)(this.model.toJSON()));
            return this;
        },
        onSchemaClick: function () {
            Tamanoir.router.navigate(location.hash + '/' + this.model.get('name'), {trigger: true});
        }
    });
});