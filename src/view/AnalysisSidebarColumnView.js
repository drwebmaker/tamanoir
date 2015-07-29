define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.View.extend({
        className: 'analysis-sidebar-column-view',
        tagName: 'li',
        events: {
            'click': 'onColumnNameClick'
        },
        initialize: function () {
            this._subviews = [];

            this.render();
        },
        render: function () {
            var template =  _.template('{{- label }}');
            this.$el.html(template(this.model.toJSON()));
            return this;
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        },
        onColumnNameClick: function () {
            Tamanoir.trigger('analysisSidebar:column:click', this.model);
        }
    });
});