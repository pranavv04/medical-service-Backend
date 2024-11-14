const mongoose = require('mongoose')
require('dotenv').config();

const mongoUrl = process.env.MONGO_URI;

mongoose.connect(mongoUrl , {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected' , ()=> console.log('Database connected'));
db.on('disconnected' , ()=> console.log('Database disconnected'));
db.on('error', (error) => console.log(error));


module.exports = db;