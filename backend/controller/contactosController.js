const db = require('../db/db');
const path = require('path');


const ObtenerTodosLosContactos = (req, res) => {
    const sql = 'SELECT * FROM contactos';//devuelve un array de objetos

    db.query(sql, (err, results) => {
        if (err)// toma valor de null si no hay hay error, y si hay error toma el valor del mismo
            throw err;//corta la ejecucion del programa y muestra el error

        res.json(results);
    });
}

const ObtenerContactoPorId = (req, res) => {
    const { id } = req.params;//destructuring de un objeto que tiene atributo id
    const sql = 'SELECT * FROM contactos WHERE id_contacto = ?'

    db.query(sql, [id], (err, result) => {
        if (err)
            throw err;

        res.json(result);
    });

}

const crearContacto = (req, res) => {
    const { asunto, nombre, fk_id_ciudad, email, mensaje, acepta } = req.body;
    console.log('Datos recibidos:', req.body);
    //const aceptaValor = acepta === '1' ? 1 : 0;
    const sql = 'INSERT INTO contactos (asunto, nombre, fk_id_ciudad, email, mensaje, acepta) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [asunto, nombre, fk_id_ciudad, email, mensaje, acepta], (err, result) => {
        if (err)
            throw err;

        res.json(
            {
                mensaje: "Contacto Creado con EXITO",
                idUsuario: result.insertId // insertId es un atributo que tiene el objeto result que devuelve el id del usuario que se acaba de crear
            });

    });


}

const ActualizarContacto = (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

    const sql = 'UPDATE contactos SET nombre = ?, email = ? WHERE id_contacto = ?'

    db.query(sql, [nombre, email, id], (err, result) => {
        if (err) throw err;

        res.json({
            mensaje: "Contacto EDITADO"

        })
    });
}



const BorrarContacto = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM contactos WHERE id_contacto = ?';

    db.query(sql, [id], (err, result) => {
        if (err) throw err;

        res.json(
            {
                mensaje: "Contacto ELIMINADO con EXITO"
            })

    });
}


module.exports =
{
    ObtenerTodosLosContactos,
    ObtenerContactoPorId,
    crearContacto,
    ActualizarContacto,
    BorrarContacto
}