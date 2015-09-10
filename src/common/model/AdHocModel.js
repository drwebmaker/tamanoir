/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainModel = require('common/model/DomainModel');

    return Backbone.Model.extend({
        defaults: {
            name: undefined,
            domain: undefined
        },

        initialize: function () {
            this.domain = new DomainModel(this.get('domain'));
        }
    });
});