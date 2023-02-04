require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const  route = require('./services/route')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))



mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true})
.then(()=>console.log("MongoDB Connected..."))
.catch((err)=>console.log(err))

app.use('/',route)

app.listen(process.env.PORT || 3001, ()=> console.log(`server 🌏 on port ${process.env.PORT}...`))