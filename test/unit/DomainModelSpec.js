/**
 * Created by valeriy.abornyev on 9/24/2015.
 */

define(function (require) {

    var ResourceModel = require('domain/model/ResourceModel');

    describe('DomainModel', function () {
        it('should be defined',
            function() {
                var DATA = {
                    name: 'Jasper',
                    metadata: [18, 15, 1, 1, 1]
                };

                var coffee = new ResourceModel(DATA);
                expect(coffee).toBeDefined();
                expect(DATA).toBeDefined();
            });

        it('should created new Model with correct values',
            function() {
                var DATA = {
                    name: 'Jasper',
                    metadata: [{
                        name: 'Jasper',
                        elements: [{
                            "group": {
                                "name": "information_schema"
                            }
                        },
                            {
                                "group": {
                                    "name": "pg_catalog"
                                }
                            }]
                    }, {
                        name: 'Jasper1',
                        elements: [{
                            "group": {
                                "name": "information_schema"
                            }
                        },
                            {
                                "group": {
                                    "name": "pg_catalog"
                                }
                            }]
                    }, {
                        name: 'Jasper2',
                        elements: [{
                            "group": {
                                "name": "information_schema"
                            }
                        },
                            {
                                "group": {
                                    "name": "pg_catalog"
                                }
                            }]
                    }]
                };

                var coffee = new ResourceModel(DATA);
                expect(coffee.get('metadata')).toEqual([{
                    name: 'Jasper',
                    elements: [{
                        "group": {
                            "name": "information_schema"
                        }
                    },
                        {
                            "group": {
                                "name": "pg_catalog"
                            }
                        }]
                }, {
                    name: 'Jasper1',
                    elements: [{
                        "group": {
                            "name": "information_schema"
                        }
                    },
                        {
                            "group": {
                                "name": "pg_catalog"
                            }
                        }]
                }, {
                    name: 'Jasper2',
                    elements: [{
                        "group": {
                            "name": "information_schema"
                        }
                    },
                        {
                            "group": {
                                "name": "pg_catalog"
                            }
                        }]
                }]);

                expect(coffee.get('name')).toEqual('Jasper');
            });
    });
});