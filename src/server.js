const express = require('express');
const cors = require('cors');
require('dotenv').config();
const getConnection = require('./database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.authPath = '/api/login';
        this.userPath = '/api/user';
        this.categoryPath = '/api/category';
        this.productPath = '/api/product';

        //Database
        this.database();

        //Middlewares
        this.middlewares();

        //Bodyparser
        this.app.use(express.json());

        //Start server
        this.start();
    }

    database() {
        getConnection();
    }

    middlewares(){
        this.app.use(cors());
    }

    start() {
        this.app.use(this.authPath, require('./routes/auth-routes'));
        this.app.use(this.userPath, require('./routes/user-routes'));
        this.app.use(this.categoryPath, require('./routes/category-routes'));
        this.app.use(this.productPath, require('./routes/product-routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}


module.exports = Server;
