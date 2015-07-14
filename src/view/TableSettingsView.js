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
            Tamanoir.connecion.getColumns(this.model.get('name')).then(this.onColumnsLoaded.bind(this));
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
                name = $(event.target).parent().text();
            console.log('columns click', value, this.model);

            if (value) {
                this.model.set('selected', this.model.get('selected').concat(name));
            } else {
                this.model.set('selected', _.without(this.model.get('selected'), name));
            }

            console.log('selected', this.model.get('selected'));
        },
        onColumnsLoaded: function (columns) {
            this.model.set('columns', _.map(columns, function (value) { return value.name; }))
        }
    });
});