const express = require('express');
const router = express.Router();
const contacController = require('../controller/contactosController');


router.get('/', contacController.ObtenerTodosLosContactos);// consultas gnral
router.get('/:id',contacController.ObtenerContactoPorId);//consulta por id, especifica
router.post('/',contacController.crearContacto);//crear user
router.put('/:id',contacController.ActualizarContacto);//actualizar/modificar user
router.delete('/:id',contacController.BorrarContacto);// borrar user



module.exports = router;

