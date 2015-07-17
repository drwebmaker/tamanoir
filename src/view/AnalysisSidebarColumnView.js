define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.View.extend({
        className: 'analysis-sidebar-column-view',
        tagName: 'li',
        template: _.template('{{- name }}'),
        events: {
            'click': 'onColumnNameClick'
        },
        initialize: function () {
            this._subviews = [];

            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
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