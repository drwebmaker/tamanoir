define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        AnalysisSidebarColumnView = require('view/AnalysisSidebarColumnView'),
        AnalysisSidebarViewTemplate = require('text!template/AnalysisSidebarViewTemplate.html');

    return Backbone.View.extend({
        className: 'analysis-sidebar-view',
        template: _.template(AnalysisSidebarViewTemplate),
        events: {
        },
        initialize: function () {
            this._subviews = [];

            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html(this.template());

            _.each(this.collection.getCategories(), this.addCategory, this);
            _.each(this.collection.getNumbers(), this.addNumber, this);

            return this;
        },
        addCategory: function (model) {
            var view = new AnalysisSidebarColumnView({model: model});
            this._subviews.push(view);
            this.$('.categories-holder').append(view.$el);
        },
        addNumber: function (model) {
            var view = new AnalysisSidebarColumnView({model: model});
            this._subviews.push(view);
            this.$('.numbers-holder').append(view.$el);
        },
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
});