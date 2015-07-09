/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        HomeViewTemplate = require('text!template/HomeViewTemplate.html');

    return Backbone.View.extend({
        className: 'home-view',
        template: HomeViewTemplate,
        events: {
            'click .newConnection': 'onNewConnectionClick',
            'click [data-datasource-type]': 'onDatasourceTypeClick'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template);
            this.calculateHeight();
            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                var bodyHeight = $('body').height();

                this.$('.home-sidebar').height(bodyHeight - 40);
                this.$('.home-datasources').height(bodyHeight - 40);
                this.$('.home-datasource-types').height(bodyHeight - 40);
            }.bind(this), 0);
        },
        onNewConnectionClick: function (event) {
            $(event.target).toggleClass('active');
            this.$('.home-datasources').toggleClass('hide');
        },
        onDatasourceTypeClick: function (event) {
            var type = $(event.target).data('datasource-type');
            console.log(type, 'datasource type clicked');
        }
    });
});