const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.get('/', userController.ObtenerTodosLosContactos);// consultas gnral
router.get('/:id',userController.ObtenerContactoPorId);//consulta por id, especifica
router.post('/',userController.crearContacto);//crear user
router.put('/:id',userController.ActualizarContacto);//actualizar/modificar user
router.delete('/:id',userController.BorrarContacto);// borrar user



module.exports = router;

