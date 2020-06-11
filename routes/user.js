const express = require('express');
const user = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

user.post("/login", async (req,res,next)=>{
    const {user_mail, user_password} = req.body;
    const query = `SELECT * FROM usuarios WHERE email = '${user_mail}' AND password = '${user_password}';`
    const rows = await db.query(query);


    if (user_mail && user_password) {
        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }else{
            return res.status(200).json({code: 401, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    
    return res.status(500).json({code: 500, message: "Campos incompletos"});
    
});


user.post("/edit", async (req, res, next) => {
    const {user_id, user_name,user_lastname,user_telefono , user_mail, user_pass, user_direccion } = req.body

    if (user_id &&  user_name && user_lastname && user_telefono  &&  user_mail &&  user_pass &&  user_direccion) {
        let query = `UPDATE usuario SET Nombre='${user_name}',Apellido=${user_lastname},Telefono=${user_telefono},Email=${user_mail},Password=${user_pass},Direccion=${user_direccion} WHERE id=${user_id}`
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});

});

user.post("/delete", async (req, res, next) => {
    const {user_id } = req.body

    if (user_id) {
        let query = `DELETE FROM usuarios WHERE id=${user_id}`

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario eliminado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});

});


user.get("/", async (req,res,next)=>{
    const query = "SELECT * FROM user";

    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows});
})



module.exports = user;