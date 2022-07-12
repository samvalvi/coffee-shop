const express = require('express');
const cors = require('cors');
require('dotenv').config();
const getConnection = require('./database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.userPath = '/api/user';

        //Database
        this.database();

        //Middlewares
        this.middlewares();

        //Bodyparser
        this.app.use(express.json());

        //Start server
        this.start();
    }

    middlewares(){
        this.app.use(cors());
    }

    database() {
        getConnection();
    }

    start() {
        this.app.use(this.userPath, require('./routes/user-routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}


module.exports = Server;
