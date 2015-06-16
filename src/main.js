/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
define(function (require) {
    var MainRouter = require('router/MainRouter'),
        ConnectionsCollection = require('collection/ConnectionsCollection');

    require('config/underscore.config');

    window.Tamanoir = {};
    Tamanoir.application = {};
    Tamanoir.application.view = {};
    Tamanoir.application.model = {};
    Tamanoir.application.collection = {};

    Tamanoir.application.collection.connections = new ConnectionsCollection([ //TODO: remove hardcoded data
        {type: 'jdbc', name: 'jasperserver', url: 'jdbc:postgresql://localhost:5432/jasperserver', properties: {user: 'postgres', password: 'postgres'}},
        {type: 'csv', name: 'sales', url: 'file:///C:/Users/artem.malieiev/Downloads/sales.csv', properties: {useFirstRowAsHeader: true}}
    ]);

    Tamanoir.application.router = new MainRouter();
});