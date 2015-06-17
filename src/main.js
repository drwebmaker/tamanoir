/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var MainRouter = require('router/MainRouter'),
        ConnectionsCollection = require('collection/ConnectionsCollection');

    require('config/underscore.config');
    require('config/backbone.config');

    ConnectionsCollection.add([ //TODO: remove hardcoded data
        {type: 'jdbc', name: 'jasperserver', url: 'jdbc:postgresql://localhost:5432/jasperserver', user: 'postgres', password: 'postgres'},
        {type: 'jdbc', name: 'foodmart', url: 'jdbc:postgresql://localhost:5432/foodmart', user: 'postgres', password: 'postgres'},
        {type: 'csv', name: 'sales', url: 'file:///C:/Users/artem.malieiev/Downloads/sales.csv', useFirstRowAsHeader: true}
    ]);

    window.Tamanoir = {};
    Tamanoir.router = new MainRouter();
});