/**
 * Created by Artem.Malieiev on 7/14/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        AnalysisViewTemplate = require('text!template/AnalysisViewTemplate.html');

    return Backbone.View.extend({
        className: 'analysis-view',
        template: AnalysisViewTemplate,
        events: {
            'click .editDomain': 'onEditDomainClick',
            'click .domain-designer-title': 'onProductTitleClick'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template);
            return this;
        },
        onEditDomainClick: function () {
            if (this.model.get('id')) {
                Tamanoir.navigate('connection/' + this.model.get('connectionId') + '/' + this.model.get('id'), {trigger: true});
            } else {
                Tamanoir.navigate('connection/' + this.model.get('connectionId'), {trigger: true});
            }
        },
        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        }
    });
});