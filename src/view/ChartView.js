/**
 * Created by Artem.Malieiev on 7/2/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        c3 = require('c3'),
        $ = require('jquery'),
        ChartTemplate = require('text!template/ChartViewTemplate.html');

    return Backbone.View.extend({
        className: 'chart',
        template: ChartTemplate,
        events: {
            'click .settings': 'showSettings',
            'click .menu': 'hideSettings',
            'click .menu li': 'changeChartType'
        },
        initialize: function () {
            this._subviews = [];

            this.listenTo(Tamanoir, 'axis:row:drop', this.onAxisRowDrop);
            this.listenTo(Tamanoir, 'axis:column:drop', this.onAxisColumnDrop);
            this.listenTo(Tamanoir, 'axis:item:remove', this.onAxisItemRemove);

            this.render();
        },
        render: function () {
            this.$el.html(this.template);

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
        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        },
        onAxisRowDrop: function (name, data) {
            if (this.chart) {
                this.chart.load({
                    columns: [
                        [name].concat(data)
                    ]
                })
            } else {
                this.chart = c3.generate({
                    bindto: '.chart-holder',
                    size: {
                        height: $('.top-section').height() - $('.axis-view').height() - this.$('.header').height() - 2
                    },
                    data: {
                        columns: [
                            [name].concat(data)
                        ]
                    }
                });
            }
        },
        onAxisColumnDrop: function (name, data) {
            var storedData = this.getStoredData();

            this.chart && this.chart.destroy();
            this.chart = c3.generate({
                bindto: '.chart-holder',
                size: {
                    height: $('.top-section').height() - $('.axis-view').height() - this.$('.header').height() - 2
                },
                data: {
                    columns: storedData
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 75,
                            multiline: false
                        },
                        categories: data
                    }
                }
            });
        },
        onAxisItemRemove: function (model) {
            if (model.get('axis') === 'x') {
                var storedData = this.getStoredData();

                this.chart && this.chart.destroy();
                this.chart = c3.generate({
                    bindto: '.chart-holder',
                    size: {
                        height: $('.top-section').height() - $('.axis-view').height() - this.$('.header').height() - 2
                    },
                    data: {
                        columns: storedData
                    }
                });
            } else {
                this.chart.unload({
                    ids: model.get('name')
                });
            }
        },
        getStoredData: function () {
            if (!this.chart) return [];

            return _.map(this.chart.data(), function (value) {
                return [value.id].concat(this.chart.data.values(value.id));
            }, this);
        }
    });
});