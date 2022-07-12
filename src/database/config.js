const mongoose = require('mongoose');


const options = {
    maxPoolSize: 10,
}

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, options, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('DB is connected');

    }catch(error) {
        console.log(error);
        throw new Error('Error connecting to database');
    }
}


module.exports = dbConnect;