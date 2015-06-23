/**
 * Created by Artem.Malieiev on 6/18/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        TableListItemViewTemplate = require('text!template/library/TableListItemViewTemplate.html');

    return Backbone.View.extend({
        tagName: 'li',
        events: {
            'click': 'onTableClick'
        },
        render: function () {
            this.$el.html(_.template(TableListItemViewTemplate)(this.model.toJSON()));
            return this;
        },
        onTableClick: function () {
            Tamanoir.router.navigate(location.hash + '/' + this.model.get('name'), {trigger: true});
        }
    });
});