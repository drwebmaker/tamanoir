/**
 * Created by Artem.Malieiev on 7/1/2015.
 */
define(function (require) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        idAttribute: 'name',
        defaults: {
            name: '',
            fullName: '',
            hidden: false,
            belongTo: '',
            referenceTo: '',
            type: 'category'
        },

        getForeignTableName: function () {
            var reference = this.get('referenceTo');

            return reference.slice(reference.indexOf('.') + 1, reference.lastIndexOf('.'));
        },

        getForeignColumnName: function () {
            var reference = this.get('referenceTo');

            return reference.slice(reference.lastIndexOf('.') + 1);
        },

        toggleHidden: function () {
            this.save('hidden', !this.get('hidden'));
        }
    });
});