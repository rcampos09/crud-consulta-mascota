const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota')

// Lectuta de todos documento
router.get('/', async (req, res) => {
    try {
        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)

        res.render("mascotas",{
            arrayMascotas: arrayMascotasDB
        })  
    } catch (error) {
        console.log(error) 
    }
})

// Ruta crear documento
router.get('/crear',(req,res)=>{
    res.render('crear')
})

// Guardar documento
router.post('/', async (req,res) => {
    const body = req.body
    try {
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()
        res.redirect('/mascotas')
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req,res) =>{
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findOne({_id: id})
        res.render('detalle',{
            mascota:  mascotaDB,
            error: false
        })

    } catch (error) {
        console.log(error)
        res.render('detalle',{
            error: true,
            mensaje: 'No se encuentra id de mascota seleccionado'
        })
    }
})

router.delete('/:id', async (req,res)=> {
    const id = req.params.id
    console.log('id desde backend', id)
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({ _id: id });
        console.log(mascotaDB)
        if (!mascotaDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Eliminado!'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req,res)=>{
    const id = req.params.id
    const body = req.body   
    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body , { useFindAndmodify: false})
            res.json({
                estado: true,
                mensaje: 'OK editado'
            })
    } catch (error) {
        console.log(error),
        res.json({
            estado: false,
            mensaje: 'Fallido editado'
        })
    }
})

module.exports = router;