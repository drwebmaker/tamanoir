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


            //if(this.collection !== undefined) {
            //    settings = this.collection.generateVisModel();
            //    var even = this.collection.find(function (model) {
            //        return model.get('id') == 'customers';
            //    });
            //}

            if(settings !== undefined) {
                nodes = new vis.DataSet(settings.nodes);
                edges = new vis.DataSet(settings.edges);

                var data = {
                    nodes: nodes,
                    edges: edges
                };
            }

            var   options = {
                manipulation: {
                    enabled: false,

                    addNode: function(nodeData,callback) {}
                },
                nodes: {
                    scaling: {
                        max: 2

                    },
                    mass: 1,
                    shape: 'box'
                }
                //physics: {
                //    //barnesHut: {
                //    //    gravitationalConstant: -100
                //    //},
                //    repulsion: {
                //        centralGravity: 0.2
                //    }
                //}
            };

            this.calculateHeight();

            setTimeout(function() {
                self.network = new vis.Network(self.el, data, options);
                self.network.setOptions(options);
                self.network.on('click', self.clickNode.bind(self));
            },0);



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
            console.log(this.draggedGroupModel.get('name'));
            nodes.add({id: this.draggedGroupModel.get('name'), label: this.draggedGroupModel.get('name')});
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

