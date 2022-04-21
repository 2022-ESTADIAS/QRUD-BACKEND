const {qrEmail, activateEmail, transport } = require("../helpers/qrEmail");
const { rfcRgx } = require("../helpers/regex");
const Usuario = require("../models/user.Model");
const { generarQRuser } = require("./user.Controller");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Un correo para activación de cuentas de usuarios.
 * @description FUNCIONALIDAD PWA. Se realiza el registro de usuarios de manera publica.
 * @Todo Actualizar url de correo. 
 */
const registroPublico = async(req,res) =>{
    try {
        const { nombre,rfc,direccion,telefono,email } = req.body;
        if(rfcRgx(rfc)){
          const usuario = new Usuario({ nombre,rfc,direccion,telefono,email });
          usuario.isActivo = false
          await usuario.save();
        
          const link = `http://localhost:3000/public/email-active/${usuario.id}`          
          //CORREO
          transport.sendMail(activateEmail(usuario.email,link)).then(_info =>{
            res.status(200).json({msg: "Correo de activación enviado exitosamente"})
          })

    
        }else{
          res.status(400).json({msg: "formato incorrecto"})
        }
            
      } catch (error) {
        
        return res.status(500).json({ err: "Error de servidor.", error });   
        
      }


}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns EXITO:  "Usuario activado exitosamente". Error:"No se puede activar al usuario"
 * @description FUNCIONALIDAD PWA. Este es el paso despues de realizar el registro y hacer click al enlace del correo.
 */
const activarUsuarioEmail = async(req,res)=>{
    try {
        const {id} = req.params
        const usuario = await  Usuario.findById(id)
        if (!usuario.isActivo){
            usuario.isActivo = true
            usuario.save()
            return res.status(200).json({msg: "Usuario activado exitosamente"})

        }else{
            return res.status(400).json({msg: "No se puede activar al usuario"})
        }
        
    } catch (error) {
        return res.status(500).json({ err: "Error de servidor.", error });   
    }
    }





module.exports = {
    registroPublico,
    activarUsuarioEmail
}