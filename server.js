const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

console.log(process.env);

const app = express()
app.use(express.json())

//Routers
const postsRoutes = require('./routes/api/posts')

//Connect to MOngo db
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        console.log('MongoDB Connected');
    })

//use Routes
app.use('/api/posts', postsRoutes);

const PORT = process.env.YOUR_PORT || process.env.PORT || 80
app.listen(PORT, () => { console.log(`server at ${PORT}`); })