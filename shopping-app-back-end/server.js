// Imports
const express = require('express');
const mongoose = require('mongoose');

// ENV
const dotenv = require('dotenv');
dotenv.config();
const mongoURL = process.env.DB_CONNECT;

// Database
mongoose.connect(mongoURL, {useNewUrlParser:true, useUnifiedTopology:true }, ()=>console.log('mongoDB is connected'));
// const connection = mongoose.connection;
// connection.once('open', ()=>{console.log('MongoDB is connected.')})


// App
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// routes
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', registerRouter);
app.use('/login', loginRouter);


app.get('/',(req,res)=>res.send('home page'));
// app.get('/users',(req,res)=>res.send('users page'));

app.listen(PORT, ()=>{ console.log(`Server is running on port: ${PORT}`)});