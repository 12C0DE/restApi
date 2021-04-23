const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config')

//import Routes
const postsRoute = require('./routes/posts');
// const getRoute = require('./routes/get');


app.get('/', (req,res) => {
    res.send('Home');
})

//MIDDLEWARE - function that executes when routes are being hit

app.use(bodyParser.json()); //this line is needed in order for bodyParser pkg to run

app.use('/posts', postsRoute);
// app.use('/', getRoute);

    // app.use('/posts', () => {
    //     console.log('this is middleware running');
    // });



//connect to DB
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true }, () => console.log('connected to DB'));

//how to start lisening to the server?
app.listen(3000); //port