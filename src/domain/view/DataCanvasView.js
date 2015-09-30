/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        vis = require('vis'),
        RightSidebarView = require('domain/view/RightSidebarView'),
        ResourcesCollection = require('domain/collection/ResourcesCollection'),
        ElementsCollection = require('domain/collection/ElementsCollection'),
        TableModel = require('domain/model/TableModel'),
        generateVisModel = require('utils/generateVisModel'),
        JoinTypeWidgetView = require('domain/view/JoinTypeWidgetView');

    return Backbone.View.extend({

        className: 'data-canvas-view',
        events: {
            'dragover': 'onDragOver',
            'drop': 'onDrop'
        },

        initialize: function (options) {
            this._subviews = [];
            this.elementsCollection;

            this.listenTo(Tamanoir, 'dragstart:sidebarGroup', this.onSidebarGroupDragstart);
            this.listenTo(Tamanoir, 'dragstart:sidebarConnection', this.onSidebarConnectionDragstart);
            this.listenTo(this.collection, 'update reset', this.render);

            setTimeout(function () {this.render();}.bind(this), 100);//TODO: find solution how to remove this hook
        },

        render: function () {
            //this.$el.empty();

            //var settings = this.collection.generateVisModel(),

            this.collection.each(function(model) {
                 this.elementsCollection = new ElementsCollection( model.get('metadata').elements );
                console.log(this.elementsCollection);
            });
            //generateVisModel(this.collection);
            var settings = {
                    nodes: [
                        {id: 'categories', label: 'categories'},
                        {id: 'customercustomerdemo', label: 'customercustomerdemo'},
                        {id: 'customerdemographics', label: 'customerdemographics'},
                        {id: 'customers', label: 'customers'},
                        {id: 'employees', label: 'employees'},
                        {id: 'employeeterritories', label: 'employeeterritories'},
                        {id: 'order_details', label: 'order_details'},
                        {id: 'orders', label: 'orders'},
                        {id: 'products', label: 'products'},
                        {id: 'region', label: 'region'},
                        {id: 'shippers', label: 'shippers'},
                        {id: 'shippers_tmp', label: 'shippers_tmp'},
                        {id: 'suppliers', label: 'suppliers'},
                        {id: 'territories', label: 'territories'},
                        {id: 'usstates', label: 'usstates'}
                    ],
                    edges: [
                        {from: 'customercustomerdemo', to: 'customers'},
                        {from: 'employeeterritories', to: 'territories'},
                        {from: 'order_details', to: 'orders'},
                        {from: 'order_details', to: 'products'},
                        {from: 'orders', to: 'customers'},
                        {from: 'orders', to: 'employees'},
                        {from: 'products', to: 'suppliers'},
                        {from: 'products', to: 'categories'},
                        {from: 'territories', to: 'region'}
                    ]
                },
                options = {};

            this.network = new vis.Network(this.el, settings, options);
            this.network.on('click', this.clickNode.bind(this));

            this.calculateHeight();
            return this;
        },

        clickNode: function(param) {

            var model = this.collection.get(param.nodes[0]);

            if(model) {
                var view = new RightSidebarView({model: model});
                $('.right-sidebar-container').html(view.render().$el);
            }
        },

        onDragOver: function (event) {
            event.preventDefault();
        },

        onDrop: function (event) {
            console.log('drop:sidebarGroup');
            console.log(this.draggedGroupModel);
            console.log(this.collection);
            //console.log(event);
            //console.log(window.temp);
            //if(!window.temp.model.get('isOnCanvas')) {
            //    window.temp.model.set('isOnCanvas', true);
            //    console.log('onCanvas');
            //}
            //console.log(this.elementsCollection);
            //console.log(window.temp);
            if (this.draggedGroupModel) {
                this.draggedGroupModel.set('isOnCanvas', true);
            }
        },

        onSidebarGroupDragstart: function (group) {
            console.log(group);
            console.log('dragstart', group);
            this.draggedGroupModel = group;

        },

        onSidebarConnectionDragstart: function (tablesCollection) {
            console.log('dragstart:sidebarConnection');
            this.draggedTablesCollection = tablesCollection;
            this.draggedTableModel = null;
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        },

        calculateHeight: function () {
            var self = this;

            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    header = self.$('.domain-designer-header'),
                    contentHeight = bodyHeight - header.height();

                self.$el.height(contentHeight);
            }, 0);
        }
    });
});

