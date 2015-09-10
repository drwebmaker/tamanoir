/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        vis = require('vis'),
        RightSidebarView = require('domain/view/RightSidebarView'),
        TableModel = require('domain/model/TableModel'),
        JoinTypeWidgetView = require('domain/view/JoinTypeWidgetView');

    return Backbone.View.extend({

        className: 'data-canvas-view',
        events: {
            'dragover': 'onDragOver',
            'drop': 'onDrop'
        },

        initialize: function (options) {
            this._subviews = [];

            this.listenTo(Tamanoir, 'dragstart:sidebarTable', this.onSidebarTableDragstart);
            this.listenTo(Tamanoir, 'dragstart:sidebarConnection', this.onSidebarConnectionDragstart);
            this.listenTo(this.collection, 'update reset', this.render);
            $(window).on('resize', _.debounce(_.bind(this.render, this), 500));

            this.render();
        },

        render: function () {
            this.$el.empty();

            var settings = this.collection.generateVisModel(),
                options = {};

            this.network = new vis.Network(this.el, settings, options);
            this.network.on('click', this.clickNode.bind(this));





            return this;
        },

        clickNode: function(param) {

            var filteredCollection = this.collection.where({name: param.nodes[0]});

            var filteredModel = filteredCollection.filter(function(item) {
                if(item.get('name') == param.nodes[0]) return true;
            });
            if(filteredModel.length > 0) {
                var view = new RightSidebarView({model: filteredModel[0]});
                $('.right-sidebar-container').html(view.render().$el);
            }
            // get model from this.collection with name which equal name from param
            //render sidebar with this model
        },

        onDragOver: function (event) {
            event.preventDefault();
        },

        onDrop: function (event) {
            console.log('drop:sidebarTable');
            if (this.draggedTableModel) {
                this.collection.add(this.draggedTableModel);
            } else {
                this.collection.add(this.draggedTablesCollection.models);
            }
        },

        onSidebarTableDragstart: function (tableModel) {
            this.draggedTableModel = tableModel;
            this.draggedCollection = null;
        },

        onSidebarConnectionDragstart: function (tablesCollection) {
            console.log('dragstart:sidebarConnection');
            this.draggedTablesCollection = tablesCollection;
            this.draggedTableModel = null;
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});

