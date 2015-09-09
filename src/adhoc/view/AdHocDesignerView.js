/**
 * Created by Artem on 9/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        //DataCollection = require('common/collection/DataCollection'),
        //TablesCollection = require('common/collection/TablesCollection'),
        //SidebarView = require('adhoc/view/SidebarView'),
        //DialogView = require('common/view/DialogView'),
        //TableView = require('common/view/TableView'),
        AdHocDesignerViewTemplate = require('text!adhoc/template/AdHocDesignerViewTemplate.html');

    return Backbone.View.extend({

        className: 'adhoc-view',
        template: AdHocDesignerViewTemplate,
        events: {
            'click .productTitle': 'onProductTitleClick'
        },

        initialize: function () {
            this._subviews = [];

            //TODO: should be placed inside domain model
            //this.tablesCollection = new TablesCollection();

            //this.dataCollection = new DataCollection();

            this.render();
        },

        render: function () {
            this.$el.html(this.template);

            //this.tableView = new TableView({collection: this.dataCollection});

            //this.$('.sidebar-container').html(this.sidebarView.$el);
            //this.$('.table-container').html(this.tableView.$el);

            this.calculateHeight();

            return this;
        },

        calculateHeight: function () {
            var self = this;

            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    header = self.$('.adhoc-header'),
                    contentHeight = bodyHeight - header.height();

                //self.sidebarView.$el.height(contentHeight);
                //self.dataCanvasView.$el.height(contentHeight / 2);
                //12px workaround should be removed
                //self.tableView.$el.height(contentHeight / 2 - 12);
            }, 0);
        },

        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});