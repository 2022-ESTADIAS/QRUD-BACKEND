// const  {generarJWT} = require('../helpers/generarJWT');
// const Personal = require('../models/personal.Model');
// const bcryptjs = require('bcryptjs');
const { request } = require('express');
const login  = (req = request,res) =>{

    // const {email,password} = req.body;

    console.log(req.body)
    // console.log(email)
    // console.log(password)
    // try {
    //     let token;
       
         
    //     const personal = await Personal.findOne({email}).select('+password');


    //     if(!personal){
    //         return res.status(404).send({
    //             status: "Error",
    //             message: "El usuario no fue encontrado favor de registrarse en la aplicacion"
    //         })
    //     }
           
    //    const compararPassword = await bcryptjs.compare(password,personal.password);

    //     console.log(compararPassword);
        return res.status(200).send({
            status: "success",
            // message: "Usuario encontrado",
            // token,
            // personal
        });



    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).send({
    //         status: 'error',
    //         message: "error en el servidor"
    //     })
    // }

}

module.exports = {
    login
}