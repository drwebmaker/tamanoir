/**
 * Created by valeriy.abornyev on 8/25/2015.
 */
define(function (require) {

    var TablesView = require('view/TablesView'),
        ConnectionModel = require('model/PostgreSQLConnectionModel'),
        sinon = require('sinon');

    describe('TablesView', function () {

        it('Should call method "addTable" when we rendering this view', function () {
            var tablesView = new TablesView({collection: new Backbone.Collection({connectionId: '', name: 'testName', label: ''})});
            var createStub = sinon.stub(tablesView, 'addTable');

            expect(createStub).not.toHaveBeenCalled();

            tablesView.render();
            expect(createStub).toHaveBeenCalled();
        });

    });
});