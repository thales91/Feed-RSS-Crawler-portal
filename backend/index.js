const app = require('express')()
const mongoose = require('mongoose')
const consign = require('consign')

require('./config/mongodb')

app.mongoose = mongoose;

consign()
    .then('./config/middlewares.js')
    .then('./api')    
    .then('./config/routes.js')  
    .into(app)


app.listen(4000,()=>{
    console.log('beckend executando...')
})