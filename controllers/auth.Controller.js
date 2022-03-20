const  {generarJWT} = require('../helpers/generarJWT');
const Personal = require("../models/personal.Model")
const bcryptjs = require('bcryptjs');

const login  = async(req ,res) =>{

    const {email,password} = req.body;

    try {
        let token;
                
        const personal = await Personal.findOne({email}).select('+password').populate({path: 'rol'});

        if(!personal){
            return res.status(404).json({msg: "Personal no encontrado."})
        }

        if (!personal.isActivo) {
            return res.status(404).json({ msg: "Personal no encontrado." });
        }

       const compararPassword = await bcryptjs.compare( password, personal.password );
       if(!compararPassword){
           return res.status(400).json({msg: "contraseña incorrecta."})
       }
        token = await generarJWT(personal._id);

        return res.status(200).json({
            msg: "Usuario encontrado",
            token,
            personal
        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "error en el servidor"
        })
    }

}

module.exports = {
    login
}