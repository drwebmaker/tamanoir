/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DatabaseView = require('view/library/DatabaseView'),
        LibraryViewTemplate = require('text!template/library/LibraryViewTemplate.html');

    require('css!styles/library/library');

    return Backbone.View.extend({
        initialize: function () {
            this.database = new DatabaseView();
        },
        render: function () {
            this.$el.html(LibraryViewTemplate);
            this.$el.append(this.database.render().$el);
            return this;
        }
    });
});