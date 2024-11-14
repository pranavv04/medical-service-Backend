const express = require('express');
const app = express();
const db = require('./database/db')
app.use(express.json());
require('dotenv').config();


const PORT = process.env.PORT || 3000;

app.get('/' , (req,res)=>{
    res.send('Your server is running fine my nig')
})


const serviceRoute = require('./routes/servicRoutes')
app.use('/service' , serviceRoute);

app.listen(PORT , ()=>console.log('Server is running'))