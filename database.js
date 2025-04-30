const mongoose =require("mongoose");
require('dotenv').config();

const connectDatabase =() =>{
    mongoose.connect(process.env.db_URL)
    .then((data) =>{
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) =>{
        console.error(`Database connection failed: ${err.message}`);
        process.exit(1);
    });
};



module.exports = {connectDatabase};