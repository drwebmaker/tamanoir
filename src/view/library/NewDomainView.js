/**
 * Created by Artem.Malieiev on 6/23/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        DomainModel = require('model/DomainModel'),
        NewDomainViewTemplate = require('text!template/library/NewDomainViewTemplate.html');

    return Backbone.View.extend({
        events: {
            'click button.add': 'onAddButtonClick'
        },
        initialize: function () {
            this.model = new DomainModel();
        },
        render: function () {
            this.$el.html(NewDomainViewTemplate);
            return this;
        },
        onAddButtonClick: function () {
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