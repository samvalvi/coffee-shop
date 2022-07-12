const express = require('express');
const cors = require('cors');
require('dotenv').config();


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.userPath = '/api/user';

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
