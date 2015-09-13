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

            this.showDropZone = _.debounce(this.showDropZone, 1000, true);

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
            console.log('showDropZone');

            this.chartDropZoneView.$el.show();
            this.chartDropZoneView.$('.y-zone, .center-zone').css({
                height: this.$el.height() - 70
            });
            this.chartDropZoneView.$('.x-zone, .center-zone').css({
                width: this.$el.width() - 70
            });
        },

        hideDropZone: function () {
            console.log('hideDropZone');
            this.chartDropZoneView.$el.hide();
        },
        onDragover: function () {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(_.bind(this.hideDropZone, this), 200);
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