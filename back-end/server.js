const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// ENV setups
const dotenv = require('dotenv');
dotenv.config();

// Database setups
const mongoURL = process.env.DB_CONNECT;
const mongoConfig = {
     useNewUrlParser:true,
     useUnifiedTopology:true,
     useCreateIndex: true,
     useFindAndModify: false
}

mongoose.connect(mongoURL, mongoConfig);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{console.log('MongoDB is connected.')});


// App setups
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// routes
const profileRouter = require('./routes/profile');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const storeRouter = require('./routes/store')

app.use('/api/profile', profileRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/store', storeRouter);


app.listen(PORT, ()=>{ console.log(`Server is running on port: ${PORT}`)});