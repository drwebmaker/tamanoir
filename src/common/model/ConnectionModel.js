define(function (require) {
    var Backbone = require('backbone'),
        DialogView = require('common/view/DialogView'),
        ConnectionType = require('common/enum/ConnectionType'),
        _ = require('underscore');

    return Backbone.Model.extend({

        defaults: {
            name: undefined,
            metadata: undefined,
            type: ConnectionType.POSTGRES
        },

        initialize: function (attrs, options) {
            options || (options = {});
        },

        fetchMetadata: function () {
            throw 'fetchMetadata method should be overwritten';
        },

        query: function (query) {
            throw 'query method should be overwritten';
        },

        showError: _.debounce(function (error) {
            DialogView.showError(error.responseJSON.message);
        }, 1000, true)
    });
});