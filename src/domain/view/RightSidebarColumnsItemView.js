/**
 * Created by valeriy.abornyev on 9/11/2015.
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
        tagName: "li",
        className: "",
        template: _.template(RightSidebarColumnsItemViewTemplate),

        events: {
            'change input[type="checkbox"]': 'onCheckboxChange'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        onCheckboxChange: function(event) {
            var selected = this.model.get('name');
            if(this.$('input[type="checkbox"]').prop('checked')) {
                this.model.set('clicked', selected);
            } else {
                this.model.unset('clicked', selected);
            }
        }

    })
});