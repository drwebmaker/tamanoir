/**
 * Created by Artem.Malieiev on 6/26/2015.
 */
define(function (require) {

    var TableModel = require('model/TableModel'),
        DomainModel = require('model/DomainModel');

    describe('TableModel', function () {

        it('should load data from table', function (done) {
            var domain = new DomainModel({id: 70});

            domain.fetch().done(function () {
                var table = new TableModel({
                    domain: domain
                });
                table.load('public.jiuser');
                table.on('change:data', function (m, data) {
                    expect(data['public.jiuser'].metadata.length).toBe(9);
                    expect(data['public.jiuser'].data.length).toBe(6);
                    done();
                });
            });
        });
    });
});