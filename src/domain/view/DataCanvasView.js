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
            var nodes, edges;
            this.selectedModels = [];


            this.listenTo(Tamanoir, 'dragstart:sidebarGroup', this.onSidebarGroupDragstart);
            this.listenTo(Tamanoir, 'dragstart:sidebarConnection', this.onSidebarConnectionDragstart);
            this.listenTo(this.collection, 'update reset', this.render);

            setTimeout(function () {this.render();}.bind(this), 100);//TODO: find solution how to remove this hook
        },

        render: function () {
            var settings = {
                nodes: [],
                edges: []
            };
            var self = this;



            if(this.selected !== undefined) {
                settings = this.selectedModels.generateVisModel();
                //var even = this.collection.find(function (model) {
                //    return model.get('id') == 'customers';
                //});
            }

            if(settings !== undefined) {
                nodes = new vis.DataSet(settings.nodes);
                edges = new vis.DataSet(settings.edges);

                var data = {
                    nodes: nodes,
                    edges: edges
                };
            }

            var   options = {
                nodes: {
                    font:{
                        size: 5
                    }
                }

            };

            this.calculateHeight();

            setTimeout(function() {
                self.network = new vis.Network(self.el, data);
                self.network.setOptions(options);
                self.network.on('click', self.clickNode.bind(self));
            },0);

            window.el = this.el;
            window.vis = vis;
            window.data = data;


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
            var self = this;
            console.log(this.draggedGroupModel.get('name'));
            console.log(this.draggedGroupModel);
            nodes.add({id: this.draggedGroupModel.get('name'), label: this.draggedGroupModel.get('name')});
            var elements = this.draggedGroupModel.get('elements');
            elements.each(function(item) {
                if(item.get('referenceTo') !== undefined) {
                    edges.add({from: self.draggedGroupModel.get('name'), to: item._getRelatedTableName(item.get('referenceTo'))});
                }
            });
            console.log(elements);

        },

        onSidebarGroupDragstart: function (group) {
            console.log('dragstart', group);
            this.draggedGroupModel = group;
            this.draggedGroupModel.set('isOnCanvas', true);
            this.selectedModels.push(group);
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

