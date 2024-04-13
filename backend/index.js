//Archivo principal, se encarga de iniciar el servidor.
//Para ello importa la clase Server y la instancia.

const Server = require("./server/server.js");
const myServer = new Server();

myServer.listen();