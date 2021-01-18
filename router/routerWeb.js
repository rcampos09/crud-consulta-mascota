const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.render("index", {titulo: "Mi pagina de inicio"})
})

router.get('/servicios',(req,res) => {
    res.render("servicios",{servicios:'Estas en la pagina de servicios'})
})

module.exports = router;