/**
 * Created by Artem.Malieiev on 7/3/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        EditColumnViewTemplate = require('text!template/EditColumnViewTemplate.html');

    require('css!styles/editColumn');

    return Backbone.View.extend({
        className: 'editColumn',
        template: _.template(EditColumnViewTemplate),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});