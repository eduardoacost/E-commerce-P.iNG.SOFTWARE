const express = require ('express')
require('dotenv').config()
const { dbConnection } = require('../database/config.js')
const cors = require('cors');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            task: '/api/task'
        }

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();

    }

    async connectToDB(){
        await dbConnection();
    }

    addMiddlewares(){
        //CORS
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

    setRoutes(){
        this.app.use(this.paths.auth, require('../routes/auth.js'));
        this.app.use(this.paths.task, require('../routes/task.js'));

    }

    listen(){
        this.app.listen(this.port,() =>{
            console.loog('Seervidor corriendo en puerto:',process.env.PORT)
        });
    }
}

module.exports = Server;