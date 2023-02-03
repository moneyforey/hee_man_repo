const express = require('express')
const dbCoonect = require('./auth/dbconnect')
const app = require('./auth/routes')


const server = express()

server.use(express.urlencoded({ extended: true }))

server.use(express.json())

server.get('/',(req,res)=>res.send('<h1>welcome</h1>'))

server.use('/',app);

server.listen(8080, async() =>{ 
    await dbCoonect();
     console.log('http://localhost:8080')
    })