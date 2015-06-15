/**
 * Created by Artem.Malieiev on 6/11/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        QueryExecuter = require('util/QueryExecuter'),
        DatabaseModel = require('model/DatabaseModel'),
        DatabaseSelectionModel = require('model/DatabaseSelectionModel'),
        PreviewViewTemplate = require('text!template/designer/PreviewViewTemplate.html');

    require('css!styles/designer/preview');

    return Backbone.View.extend({
        className: 'preview',
        initialize: function () {
            this.model = new DatabaseModel();
            this.listenTo(this.model, 'change:result', this.render);
            this.model.query('SELECT * FROM {table}'.replace('{table}', DatabaseSelectionModel.get('table')));
        },
        render: function () {
            this.$el.html(_.template(PreviewViewTemplate)(this.model.toJSON()));
            this.calculateHeight();
            return this;
        },
        calculateHeight: function () {
            setTimeout(_.bind(function () {
                this.$el.find('.content').height(this.$el.parent().height() - this.$el.find('.title').height());
            }, this), 0);
        }
    });
});