/**
 * Created by Artem.Malieiev on 7/14/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        AnalysisViewTemplate = require('text!template/AnalysisViewTemplate.html');

    return Backbone.View.extend({
        className: 'analysis-view',
        template: AnalysisViewTemplate,
        events: {
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });
});