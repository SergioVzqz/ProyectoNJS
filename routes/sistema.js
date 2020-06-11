const express = require('express');
const sistema = express.Router();
const db = require('../config/database');

// Agregando un usuario, aunque esto tambien lo hacemos en nuestro signin.js, pero creo que es bueno ponerlo jaja 
sistema.post("/", async (req, res, next) => {
   
    const { Nombre, Apellido, Telefono, Email , Password, Direccion  } = req.body;

    if (Nombre && Apellido && Telefono && Email && Password && Direccion ) {
        let query = `INSERT INTO usuarios (Nombre, Apellido, Telefono, Email , Password, Direccion ) VALUES ('${Nombre}', ${Apellido}, ${Telefono}, ${Email}, ${Password}, ${Direccion })`;

        const rows = await db.query(query)
        console.log(rows)

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "dashboard insertado correctamente" })
        }

        return res.status(500).send({ code: 500, message: "Ocurrio un error" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos" })

});

// Borrando un usuario
sistema.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM usuarios WHERE id=${req.params.id}`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "usuario borrado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "usuario no encontrado" });
});

// Modificar el usuario usando su ID como identificador
sistema.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { Nombre, Apellido, Telefono, Email , Password, Direccion  } = req.body;

    if (Nombre && Apellido && Telefono && Email && Password && Direccion) {
        let query = `UPDATE usuario SET Nombre='${Nombre}',Apelldio=${Apelldio},Telefono=${Telefono},Email=${Email},Password=${Password},Direccion=${Direccion} WHERE id=${req.params.id}`
        const rows = await db.query(query)
        console.log(rows)

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Usuario actualizado correctamente" })
        }

        return res.status(500).send({ code: 500, message: "Ocurrio un error" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos" })

});


// Obteniendo todos los usuarios
sistema.get('/', async (req, res, next) => {
    const usuarios = await db.query("SELECT * FROM usuarios");

    return res.status(200).json({ code: 201, message: usuarios });
});

// obteniendo usuario especifico
sistema.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;

    if (id >= 1 && id <= 722) {
        const usuario = await db.query('SELECT * FROM usuarios WHERE id = ?', [id])
        return res.status(200).json({ code: 201, message: usuario });
    } else {
        return res.status(404).send({ code: 404, message: "Usuario no encontrado" })
    }
});


module.exports = sistema;