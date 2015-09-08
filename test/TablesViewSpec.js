/**
 * Created by valeriy.abornyev on 8/25/2015.
 */
define(function (require) {

    var TablesView = require('view/TablesView'),
        TableModel = require('model/TableModel'),
        DataCanvasItemsCollection = require('collection/DataCanvasItemsCollection'),
        sinon = require('sinon');

    describe('TablesView', function () {

        it('Should call method "addTable" when we rendering this view', function () {
            var tablesView = new TablesView({collection: new Backbone.Collection({connectionId: '', name: 'testName', label: ''})});
            var createStub = sinon.stub(tablesView, 'addTable');

            expect(createStub).not.toHaveBeenCalled();

            tablesView.render();
            expect(createStub).toHaveBeenCalled();
        });

        it('Should created new model with many items', function() {
            var metadata = [
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
                            "name": "UnitPrice"
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
                            "name": "OrderDate"
                        },
                        {
                            "name": "RequiredDate"
                        },
                        {
                            "name": "ShippedDate"
                        },
                        {
                            "name": "ShipVia"
                        },
                        {
                            "name": "Freight"
                        },
                        {
                            "name": "ShipName"
                        },
                        {
                            "name": "ShipAddress"
                        },
                        {
                            "name": "ShipCity"
                        },
                        {
                            "name": "ShipRegion"
                        },
                        {
                            "name": "ShipPostalCode"
                        },
                        {
                            "name": "ShipCountry"
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
                            "name": "ContactName"
                        },
                        {
                            "name": "ContactTitle"
                        },
                        {
                            "name": "Address"
                        },
                        {
                            "name": "City"
                        },
                        {
                            "name": "Region"
                        },
                        {
                            "name": "PostalCode"
                        },
                        {
                            "name": "Country"
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
            ];
            var collection = new DataCanvasItemsCollection(metadata);
            var nodeEdges = {
                nodes: [
                    {id: 'order_details', label: 'order_details'},
                    {id: 'orders', label: 'orders'},
                    {id: 'customers', label: 'customers'}

                ],
                edges: [
                    {from: 'order_details', to: 'orders'},
                    {from: 'orders', to: 'customers'}
                ]
            };


            expect(collection.getDataCanvasModel()).toEqual(nodeEdges);
        });

        it('Should created new model with one item', function() {
            var metadata = [
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
                            "name": "UnitPrice"
                        },
                        {
                            "name": "Quantity"
                        },
                        {
                            "name": "Discount"
                        }
                    ],
                    "name": "order_details"
                }
            ];
            var collection = new DataCanvasItemsCollection(metadata);

            var nodeEdges = {
                nodes: [
                    {id: 'order_details', label: 'order_details'}
                ]
            };

            expect(collection.getDataCanvasModel()).toEqual(nodeEdges);
        });

    });
});