/**
 * Created by Artem.Malieiev on 6/23/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        DomainsCollection = require('collection/DomainsCollection'),
        EditDomainViewTemplate = require('text!template/EditDomainViewTemplate.html');

    return Backbone.View.extend({
        events: {
            'click button.save': 'onSaveButtonClick',
            'change select[name="type"]': 'toggleControls'
        },
        initialize: function () {
            if (this.model.isNew()) {
                this.render();
            } else {
                this.model.fetch().done(_.bind(this.render, this));
            }
        },

        render: function () {
            this.$el.html(_.template(EditDomainViewTemplate)(this.model.toJSON()));
            this.toggleControls();
            return this;
        },

        toggleControls: function () {
            if ($('select[name="type"]').val() === 'csv') {
                $('.jdbc-controls').hide();
            } else {
                $('.jdbc-controls').show();
            }
        },

        onSaveButtonClick: function () {
            var values = this.$el.find('form').serializeArray().reduce(function(obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            this.model.save({
                type: values.type,
                name: values.name,
                url: values.url,
                nativeQuery: values.nativeQuery,
                properties: {
                    user: values.user,
                    password: values.password
                }
            }).done(function () {
                Tamanoir.navigate('library', {trigger: true});
            }).error(function (res) {
                if (res.status === 201) {
                    Tamanoir.navigate('library', {trigger: true});
                }
            });
        }
    });
});