define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        highcharts = require('highcharts'),
        ChartDropZoneView = require('adhoc/view/ChartDropZoneView');

    return Backbone.View.extend({
        className: 'chart-view',
        events: {
            'dragover': 'onDragover'
        },

        initialize: function () {
            this.chartDropZoneView = new ChartDropZoneView();

            this.listenTo(this.chartDropZoneView, 'dropX', this.onDropX);
            this.listenTo(this.chartDropZoneView, 'dropY', this.onDropY);

            this.render();
        },
        render: function () {
            this.$el.append(this.chartDropZoneView.$el);
            this.hideDropZone();
        },
        renderChart: function () {
            this.$el.highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Fruit Consumption'
                },
                xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                },
                yAxis: {
                    title: {
                        text: 'Fruit eaten'
                    }
                },
                series: [{
                    name: 'Jane',
                    data: [1, 0, 4]
                }, {
                    name: 'John',
                    data: [5, 7, 3]
                }]
            });
        },

        showDropZone: function () {
            this.chartDropZoneView.$el.show();
            this.chartDropZoneView.$el.css({
                top: (this.$el.height() / 2) - (this.chartDropZoneView.$el.height() / 2),
                left: (this.$el.width() / 2) - (this.chartDropZoneView.$el.width() / 2)
            });
        },

        hideDropZone: function () {
            console.log('hideDropZone');
            this.chartDropZoneView.$el.hide();
        },

        onDragover: function () {
            console.log('dragover');
            clearTimeout(this.timeout);
            this.timeout = setTimeout(_.bind(this.hideDropZone, this), 200);
            //TODO: find solution how to decrise showDropZone method calls
            this.showDropZone();
        },
        onDropX: function () {
            console.log('dropX');
        },
        onDropY: function () {
            console.log('dropY');
        }
    });
});