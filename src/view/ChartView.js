/**
 * Created by Artem.Malieiev on 7/2/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        c3 = require('c3'),
        $ = require('jquery'),
        ChartTemplate = require('text!template/ChartViewTemplate.html');

    return Backbone.View.extend({
        className: 'chart',
        template: ChartTemplate,
        events: {
            'click .remove': 'remove',
            'click .settings': 'showSettings',
            'click .menu': 'hideSettings',
            'click .menu li': 'changeChartType',
            'drop .chart-holder': 'onDrop'
        },
        initialize: function () {
            this.$el.addClass(this.cid);
            this.render();
        },
        render: function () {
            this.$el.html(this.template);
            $('.charts-holder').append(this.$el);

            this.chart = c3.generate({
                bindto: '.' + this.cid + ' .chart-holder',
                data: {
                    columns: []
                }
            });

            return this;
        },
        showSettings: function (event) {
            this.$('.menu').show();
        },
        hideSettings: function (event) {
            setTimeout(function () {
                this.$('.menu').hide();
            }.bind(this), 0)
        },
        changeChartType: function (event) {
            var type = $(event.target).text().trim();
            this.chart.transform(type);
        },
        onDrop: function () {
            console.log(arguments);
            this.trigger('drop', this);
        }
    });
});