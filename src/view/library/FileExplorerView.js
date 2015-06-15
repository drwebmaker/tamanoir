/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        FileExplorerView = require('text!template/library/FileExplorerViewTemplate.html');

    require('css!styles/library/files');

    return Backbone.View.extend({
        className: 'files',
        render: function () {
            this.$el.html(FileExplorerView);
            return this;
        }
    });
});