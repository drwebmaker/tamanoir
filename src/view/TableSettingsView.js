/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        TableSettingsViewTemplate = require('text!template/TableSettingsViewTemplate.html');

    return Backbone.View.extend({
        className: 'table-settings-view',
        template: _.template(TableSettingsViewTemplate),
        events: {
            'click input': 'onColumnClick'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.calculateHeight();
            return this;
        },
        calculateHeight: function () {
            setTimeout(function () {
                var topSectionHeight = $('.top-section').height(),
                    titleHeight = this.$('.title').height();

                this.$el.height(topSectionHeight);
                this.$('ul').height(topSectionHeight - titleHeight);
            }.bind(this), 0);
        },
        onColumnClick: function (event) {
            var value = $(event.target).is(':checked'),
                table = this.model.get('name'),
                name = $(event.target).parent().text();
            console.log('columns click', value, this.model);

            if (value) {
                this.model.set('selected', this.model.get('selected').concat(table + '.' + name));
            } else {
                this.model.set('selected', _.without(this.model.get('selected'), table + '.' + name));
            }

            console.log('selected', this.model.get('selected'));
        }
    });
});