const  {generarJWT} = require('../helpers/generarJWT');
const Personal = require('../models/personal.Model');
const bcryptjs = require('bcryptjs');
const { request } = require('express');

const login  = async(req = request,res) =>{

    const {email,password} = req.body;

    try {
        let token;
       
         
        // const [personal] = await Personal.find({email}).select('+password');
        const personal = await Personal.findOne({email}).select('+password').populate({
            path: 'rol',
            strictPopulate:false,
            
          });
        // console.log(personal[0])

        if(!personal){
            return res.status(404).send({
                status: "Error",
                message: "El usuario no fue encontrado favor de registrarse en la aplicacion"
            })
        }

         //SI EL USUARIO ESTA ACTIVO
    if (!personal.isActivo) {
        return res
          .status(400)
          .json({ message: "Personal no Encontrado - estado: False " });
      }

       const compararPassword = await bcryptjs.compare(password,personal.password);
    //    const id =personal._id.toString().split("(")[0];
    //    console.log(id)
      console.log(personal.id)
      console.log(personal)
        token = await generarJWT(personal._id);

        return res.status(200).send({
            status: "success",
            message: "Usuario encontrado",
            token,
            personal
        });



    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'error',
            message: "error en el servidor"
        })
    }

}

module.exports = {
    login
}