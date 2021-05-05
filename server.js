const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

console.log(process.env);

const app = express()
app.use(express.json())

//Routers
const postsRoutes = require('./routes/api/posts')

//Connect to MOngo db
mongoose.connect('mongodb+srv://meet:meet@meet.soyef.mongodb.net/canblog?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDB Connected');
    })

//use Routes
app.use('/api/posts', postsRoutes);
app.get('/',(req, res) => {
    res.send('Home').status(200)
})

const PORT = 5000
app.listen(PORT, () => { console.log(`server at ${PORT}`); })