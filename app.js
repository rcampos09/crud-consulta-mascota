// Conexion a Express
const express = require('express');
// Mongoose de conexion a MongoDB
const { Mongoose } = require('mongoose');
const app = express()
// Bodyparse Middleware de análisis del cuerpo de Node.js.
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// dotenv configuración
require('dotenv').config() 

// Rutas estaticas publicas
const public = "/public"
const status404 = "/public/404.html"

//Puesto (Variable Entorno) o (Puerto estatico)
const port = process.env.PORT || 8000;

// Conexion a base de datos MongoDB
const mongoose = require('mongoose');   
const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.ansrd.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e,'Error conexion Base de datos')) 

//Motor de planilla ejs
app.set('view engine',"ejs");
app.set('views', __dirname + '/views');

// Acceso a ruta estatica de Index
app.use(express.static(__dirname + public))

// Llamada a carpeta router/routerWeb
app.use('/', require('./router/routerWeb'))
// Llamada a carpeta router/mascotas
app.use('/mascotas', require('./router/mascotas'))

// Llamada a error 404
app.use((req,res) =>{
    res.status(404).render("404",{error404: "Error 404"})
})

// Acceso a ruta estatica de Error404
app.use((req,res,next)=>{
    res.status(404).sendFile(__dirname + status404)
})

//Puerto expuesto de Express
app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})