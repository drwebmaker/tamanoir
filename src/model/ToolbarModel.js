/**
 * Created by Artem.Malieiev on 6/25/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    var ToolbarModel = Backbone.Model.extend({
        defaults: {
            state: ''
        }
    });
    
    return new ToolbarModel();
});