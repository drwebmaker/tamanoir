/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        DataCanvasView = require('domain/view/DataCanvasView'),
        ElementsCollection = require('domain/collection/ElementsCollection'),
        DataCollection = require('domain/collection/DataCollection'),
        TablesCollection = require('domain/collection/TablesCollection'),
        DialogView = require('common/view/DialogView'),
        SidebarView = require('domain/view/SidebarView'),
        RightSidebarView = require('domain/view/RightSidebarView'),
        TableView = require('domain/view/TableView'),
        TableModel = require('domain/model/TableModel'),
        DomainDesignerViewTemplate = require('text!domain/template/DomainDesignerViewTemplate.html');

    return Backbone.View.extend({

        className: 'domain-designer-view',
        template: DomainDesignerViewTemplate,
        events: {
            'click .productTitle': 'onProductTitleClick',
            'click .saveDomain': 'onSaveDomainClick',
            'click .adHoc': 'onAdHocClick'
        },

        initialize: function (attrs, options) {
            this._subviews = [];


            this.model.get('connections').each(function (connection) {
                connection.fetchMetadata().then(function (metadata) {

                    console.log('djfhsjdf');
                }.bind(this));
            });


            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            this.elementsCollection = new ElementsCollection( metadata.elements );
            this.sidebarView = new SidebarView({collection: this.elementsCollection});
            console.log('hello');
            this.$('.sidebar-container').html(this.sidebarView.render().$el);

            this.calculateHeight();

            return this;
        },

        calculateHeight: function () {
            var self = this;

            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    header = self.$('.domain-designer-header'),
                    contentHeight = bodyHeight - header.height();

                self.sidebarView.$el.height(contentHeight);
            }, 0);
        },

        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        },

        onSaveDomainClick: function (event) {
            if (this.model.isNew()) {
                var dialogView = new DialogView({
                    title: 'Save domain',
                    content: $('<input type="text" placeholder="name" name="name"/>'),
                    buttons: [{label: 'save', action: 'save'}]
                }).render();
                this.listenToOnce(dialogView, 'action:save', function () {
                    var self = this,
                        name = dialogView.$('input').val();

                    if (name) {
                        this.domainsCollection.add(this.model);
                        this.model.save({
                            name: name,
                            tables: this.tablesCollection.toJSON(),
                        }).done(function () {
                            Tamanoir.navigate('domain/' + self.model.get('id'));
                        });
                    }
                }.bind(this));
            } else {
                this.model.save({
                    tables: this.tablesCollection.toJSON()
                }).done(function () {
                    DialogView.showMessage('Saved');
                });
            }
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});