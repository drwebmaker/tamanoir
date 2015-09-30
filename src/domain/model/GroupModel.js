/**
 * Created by valeriy.abornyev on 9/23/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        defaults: {
            name: undefined,
            elements: undefined,
            isOnCanvas: false
        }

        //generateVisModel: function () {
        //    var self = this;
        //    var model = {
        //        nodes: [],
        //        edges: []
        //    };
        //    var selected = self.getTables();
        //    if (this.size() > 1) {
        //        self.each(function (item) {
        //            model.nodes.push({id: item.get('name'), label: item.get('name')});
        //            _.each(item.get('items'), function (column) {
        //                if (column.referenceTo && _.contains(selected, item._getRelatedTableName(column))) {
        //                    model.edges.push({from: item.get('name'), to: item._getRelatedTableName(column)});
        //                }
        //            });
        //        });
        //    } else {
        //        self.each(function (item) {
        //            model.nodes.push({id: item.get('name'), label: item.get('name')});
        //            delete model.edges;
        //        });
        //    }
        //
        //    return model;
        //}
    });
});