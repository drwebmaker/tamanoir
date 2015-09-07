/**
 * Created by valeriy.abornyev on 8/25/2015.
 */
define(function (require) {

    var DataCanvasItemsCollection = require('domain/collection/TablesCollection');

    describe('TablesView', function () {

        it('Should created new model', function() {
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
                node: [
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


            expect(collection.getDataCanvasModel()).toEqual(nodeEdges);
        });

    });
});