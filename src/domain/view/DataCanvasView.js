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


            this.listenTo(Tamanoir, 'dragstart:sidebarGroup', this.onSidebarGroupDragstart);
            this.listenTo(Tamanoir, 'dragstart:sidebarConnection', this.onSidebarConnectionDragstart);
            this.listenTo(this.collection, 'update reset', this.render);

            setTimeout(function () {this.render();}.bind(this), 100);//TODO: find solution how to remove this hook
        },

        render: function () {
            //this.$el.empty();
            var self = this;
            var settings;

            this.collection.each(function(model) {
                self.elementsCollection = new ElementsCollection( model.get('metadata').elements );
                //console.log(self.elementsCollection);
            });

            //console.log(self.elementsCollection);
            //console.log(self.collection);
            if(self.elementsCollection !== undefined) {
                settings = self.elementsCollection.generateVisModel();
                var even = self.elementsCollection.find(function (model) {
                    return model.get('id') == 'customers';
                });
            }

            var   options = {
                manipulation: {
                    addNode: function(nodeData,callback) {
                        nodeData.label = 'hello Igor';
                        callback(nodeData);
                    }
                }
            };

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
            //console.log('drop:sidebarGroup');
            //console.log(this.draggedGroupModel);
            //console.log(this.draggedGroupModel.get('id'));
            if (this.draggedGroupModel) {
                this.draggedGroupModel.set('isOnCanvas', true);
            }
            console.log(this.collection);
            //var book = this.elementsCollection.get('public');
            console.log(this.elementsCollection);
            //console.log(book);
        },

        onSidebarGroupDragstart: function (group) {
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

