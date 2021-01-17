const express = require('express')
const app = express()
const public = "/public"
const status404 = "/public/404.html"

//Puesto (Variable Entorno) o (Puerto estatico)
const port = process.env.PORT || 4000;

//Motor de planilla ejs
app.set('view engine',"ejs");
app.set('views', __dirname + '/views');

// Acceso a ruta estatica de Index
app.use(express.static(__dirname + public))

app.get('/',(req, res) => {
    res.render("index", {titulo: "Mi pagina de inicio"})
})

app.get('/servicios',(req,res)  =>{
    res.render("servicios",{servicios:'Estas en la pagina de servcios'})
})

app.use((req,res) =>{
    res.status(404).render("404",{error404: "Error 404"})
})

// Acceso a ruta estatica de Error404
app.use((req,res,next)=>{
    res.status(404).sendFile(__dirname + status404)
})



//Puerto expuesto de Express
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`);
})