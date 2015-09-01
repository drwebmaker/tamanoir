/**
 * Created by valeriy.abornyev on 9/1/2015.
 */

define(function(require) {

    var PostgreSQLConnectionModel = require('model/PostgreSQLConnectionModel');

    describe('connection model', function () {
        it('should make intellij references', function () {
            var connectionModel = new PostgreSQLConnectionModel();
            connectionModel._metadata = [{
                name: 'customer',
                items: [
                    {
                        name: 'customer_id'
                    },
                    {
                        name: 'account_num'
                    },
                    {
                        name: 'lname'
                    }]
            },{
                name: 'sales_fact_1998',
                items: [
                    {
                        name: 'product_id'
                    },
                    {
                        name: 'time_id'
                    },
                    {
                        name: 'customer_id'
                    }]
            }];

            connectionModel._buildIntellijReferences();

            expect(connectionModel.getMetadata()).toEqual(
                [{
                    name: 'customer',
                    items: [
                        {
                            name: 'customer_id',
                            referenceTo: 'sales_fact_1998.customer_id'
                        },
                        {
                            name: 'account_num'
                        },
                        {
                            name: 'lname'
                        }]
                },{
                    name: 'sales_fact_1998',
                    items: [
                        {
                            name: 'product_id'
                        },
                        {
                            name: 'time_id'
                        },
                        {
                            name: 'customer_id',
                            referenceTo: 'customer.customer_id'
                        }]
                }]
            );
        });
    });
});