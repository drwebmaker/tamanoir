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

        it('Should call method "addTable" with ars', function () {
            var connectionModel = new ConnectionModel({connectionId: '', name: 'testName', label: ''});
            var collection = new Backbone.Collection();

            collection.add(connectionModel);

            var tablesView = new TablesView({collection: collection});
            spyOn(tablesView, 'addTable');

            tablesView.render();

            console.log(ConnectionModel);

            expect(tablesView.addTable).toHaveBeenCalledWith(connectionModel);
        });
    });
});