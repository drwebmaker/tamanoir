/**
 * Created by valeriy.abornyev on 9/23/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        GroupModel = require('domain/model/GroupModel'),
        ElementModel = require('domain/model/ElementModel');

    require('backbone.localStorage');

    var ElementsCollection = Backbone.Collection.extend({
        model: function(attrs, options) {
            if (attrs.group) {
                return new GroupModel({
                    name: attrs.group.name,
                    elements: new ElementsCollection(attrs.group.elements)
                });
            } else if(attrs.element){
                return new ElementModel(attrs.element, options);
            } else {
                throw 'error';
            }
        },

        initialize: function() {
            this.listenTo(this.collection, 'update reset', this.Foo);
        },

        Foo: function(item) {
            console.log(item);
        },

        generateVisModel: function () {
            var self = this;
            var nameModel;
            var model = {
                nodes: [],
                edges: []
            };

            function setValues(collection) {
                collection.each(function (item) {

                    if(item.get('elements')) {
                        nameModel = item.get('name');
                        model.nodes.push({id: item.get('name'), label: item.get('name')});
                        setValues(item.get('elements'));
                    } else  if(item.get('referenceTo') !== undefined){
                        model.edges.push({from: nameModel, to: item._getRelatedTableName(item.get('referenceTo'))});
                    }
                });
                return model;
            }

            setValues(self);


            //var selected = self.getTables();
            //if (this.size() > 1) {
            //    self.each(function (item) {
            //        model.nodes.push({id: item.get('name'), label: item.get('name')});
            //        _.each(item.get('items'), function (column) {
            //            if (column.referenceTo && _.contains(selected, item._getRelatedTableName(column))) {
            //                model.edges.push({from: item.get('name'), to: item._getRelatedTableName(column)});
            //            }
            //        });
            //    });
            //} else {
            //    self.each(function (item) {
            //        model.nodes.push({id: item.get('name'), label: item.get('name')});
            //        delete model.edges;
            //    });
            //}
            //
            return model;
        }
    });

    return ElementsCollection;
});