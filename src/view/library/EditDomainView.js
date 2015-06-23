/**
 * Created by Artem.Malieiev on 6/23/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        DomainsCollection = require('collection/DomainsCollection'),
        EditDomainViewTemplate = require('text!template/library/EditDomainViewTemplate.html');

    return Backbone.View.extend({
        events: {
            'click button.save': 'onSaveButtonClick'
        },
        initialize: function (config) {
            config = config || {};

            this.domainName = config.domainName;
            this.domainsCollection = new DomainsCollection();

            this.domainsCollection.fetch();

            this.listenTo(this.domainsCollection, 'sync', this.onDomainsLoaded);
        },
        onDomainsLoaded: function () {
            this.model = this.domainsCollection.find(_.bind(function (model) {
                return this.domainName === model.get('name');
            }, this));
            this.$el.html(_.template(EditDomainViewTemplate)(this.model.toJSON()));
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
                properties: {
                    user: values.user,
                    password: values.password
                }
            });

            Tamanoir.router.navigate('library', {trigger: true});

            this.remove();
        }
    });
});