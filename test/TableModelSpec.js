/**
 * Created by Artem.Malieiev on 6/26/2015.
 */
define(function (require) {

    var TableModel = require('model/TableModel'),
        DomainModel = require('model/DomainModel');

    describe('TableModel', function () {

        it('Should be defined when we create it', function () {
            var table = new TableModel();
            expect(table).toBeDefined();
        });
    });
});