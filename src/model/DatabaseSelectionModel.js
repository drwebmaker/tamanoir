/**
 * Created by Artem.Malieiev on 6/12/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    var DatabaseSelectionModel = Backbone.Model.extend({
        defaults: {
            schema: '',
            table: ''
        }
    });

    return new DatabaseSelectionModel();
});