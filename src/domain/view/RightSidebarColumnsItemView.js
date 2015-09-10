/**
 * Created by valeriy.abornyev on 9/10/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        ConnectionView = require('domain/view/ConnectionView'),
        TableModel = require('domain/model/TableModel'),
        TablesCollection = require('domain/collection/TablesCollection'),
        RightSidebarColumnsItemViewTemplate = require('text!domain/template/RightSidebarColumnsItemViewTemplate.html');

    return Backbone.View.extend({
        tagName: "ul",
        className: "",
        template: _.template(RightSidebarColumnsItemViewTemplate),

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            var self = this;
            var obj = this.model.items;
            obj.forEach(function(item) {
                self.$el.append(self.template(item));
            });
            return this;
        }
    });
});