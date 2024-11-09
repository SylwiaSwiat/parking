const { DocumentStore } = require("ravendb");

const store = new DocumentStore("http://127.0.0.1:8080", "ParkingApp");
store.initialize();

module.exports = store;
