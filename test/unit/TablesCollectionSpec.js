/**
 * Created by valeriy.abornyev on 8/25/2015.
 */
define(function (require) {

    var TablesCollection = require('domain/collection/TablesCollection');

    describe('TablesCollection', function () {
        describe('getDataCanvasModel method', function () {
            it('Should generate required model for vis.js library', function () {
                var tablesCollection = new TablesCollection([
                        {
                            "items": [
                                {
                                    "referenceTo": "public.orders.OrderID",
                                    "name": "OrderID"
                                },
                                {
                                    "referenceTo": "public.products.ProductID",
                                    "name": "ProductID"
                                },
                                {
                                    "name": "Quantity"
                                },
                                {
                                    "name": "Discount"
                                }
                            ],
                            "name": "order_details"
                        },
                        {
                            "items": [
                                {
                                    "name": "OrderID"
                                },
                                {
                                    "referenceTo": "public.customers.CustomerID",
                                    "name": "CustomerID"
                                },
                                {
                                    "referenceTo": "public.employees.EmployeeID",
                                    "name": "EmployeeID"
                                },
                                {
                                    "name": "RequiredDate"
                                }
                            ],
                            "name": "orders"
                        },
                        {
                            "items": [
                                {
                                    "name": "CustomerID"
                                },
                                {
                                    "name": "CompanyName"
                                },
                                {
                                    "name": "Phone"
                                },
                                {
                                    "name": "Fax"
                                }
                            ],
                            "name": "customers"
                        }
                    ]),
                    expectedModel = {
                        nodes: [
                            {id: 'order_details', label: 'order_details'},
                            {id: 'orders', label: 'orders'},
                            {id: 'customers', label: 'customers'}

                        ],
                        edges: [
                            {from: 'order_details', to: 'orders'},
                            {from: 'order_details', to: 'products'},
                            {from: 'orders', to: 'customers'},
                            {from: 'orders', to: 'employees'}
                        ]
                    };


                expect(tablesCollection.getDataCanvasModel()).toEqual(expectedModel);
            });
        });

        describe('getSelectedColumns method', function () {
            it('should return selected column names', function () {
                var collection = new TablesCollection([
                    {name: 'users', selected: []},
                    {name: 'store', selected: ['store_sales']},
                    {name: 'employees', selected: ['employee_id', 'full_name']}
                ]);

                expect(collection.getSelectedColumns()).toEqual(['store."store_sales"', 'employees."employee_id"', 'employees."full_name"']);
            });
        });

        describe('getSelectedTables method', function () {
            it('should return selected table names', function () {
                var collection = new TablesCollection([
                    {name: 'users', selected: []},
                    {name: 'store', selected: ['store_sales']},
                    {name: 'employees', selected: ['employee_id', 'full_name']}
                ]);

                expect(collection.getSelectedTables()).toEqual(['store', 'employees']);
            });
        });

        describe('getConditions method', function () {
            it('should return conditions for sql joins', function () {
                var collection = new TablesCollection([
                    {
                        name: 'users',
                        selected: ['user_id'],
                        items: [{name: 'user_id', referenceTo: 'public.store.user_id'}]
                    }, {
                        name: 'store',
                        selected: ['store_sales'],
                        items: [{name: 'store_sales'}, {name: 'store_id'}]
                    }, {
                        name: 'orders',
                        selected: [],
                        items: [{name: 'order_id'}]
                    }
                ]);

                expect(collection.getConditions()).toEqual(['users."user_id" = store."user_id"']);
            });

            it('should return empty array when selected columns from single table', function () {
                var collection = new TablesCollection([
                    {
                        name: 'users',
                        selected: [],
                        items: [{name: 'user_id', referenceTo: 'public.store.user_id'}]
                    }, {
                        name: 'store',
                        selected: ['store_sales'],
                        items: [{name: 'store_sales'}, {name: 'store_id'}]
                    }, {
                        name: 'orders',
                        selected: [],
                        items: [{name: 'order_id'}]
                    }
                ]);

                expect(collection.getConditions()).toEqual([]);
            });
        });

        describe('getQuery method', function () {
            it('should return sql query', function () {
                var collection = new TablesCollection([
                    {
                        name: 'users',
                        selected: ['user_id'],
                        items: [{name: 'user_id', referenceTo: 'public.store.user_id'}]
                    }, {
                        name: 'store',
                        selected: ['store_sales'],
                        items: [{name: 'store_sales'}, {name: 'store_id'}]
                    }, {
                        name: 'orders',
                        selected: [],
                        items: [{name: 'order_id'}]
                    }
                ]);

                expect(collection.getQuery()).toEqual('SELECT users."user_id",store."store_sales" FROM users,store WHERE users."user_id" = store."user_id"');
            });

            it('should return sql query with omitted condition when only one table is selected', function () {
                var collection = new TablesCollection([
                    {
                        name: 'users',
                        selected: ['user_id'],
                        items: [{name: 'user_id', referenceTo: 'public.store.user_id'}]
                    }, {
                        name: 'store',
                        selected: [],
                        items: [{name: 'store_sales'}, {name: 'store_id'}]
                    }, {
                        name: 'orders',
                        selected: [],
                        items: [{name: 'order_id'}]
                    }
                ]);

                expect(collection.getQuery()).toEqual('SELECT users."user_id" FROM users');
            });

            it('should return null when no columns selected', function () {
                var collection = new TablesCollection([
                    {
                        name: 'users',
                        selected: [],
                        items: [{name: 'user_id', referenceTo: 'public.store.user_id'}]
                    }, {
                        name: 'store',
                        selected: [],
                        items: [{name: 'store_sales'}, {name: 'store_id'}]
                    }, {
                        name: 'orders',
                        selected: [],
                        items: [{name: 'order_id'}]
                    }
                ]);

                expect(collection.getQuery()).toEqual(null);
            });
        });
    });
});