const {response} = require('express')
const Personal = require('../models/personal.Model')
const bcryptjs = require('bcryptjs')

const PersonalGetAll = async (req = request, res = response) => {
    // const { limite = 5, desde = 0 } = req.query;
    //IMPLEMENTACION OPCIONAL PARA VERIFICAR NUMEROS
    // if (isNaN(limite) || isNaN(desde)) {
    //   return res.status(400).json({msg : "peticion invalida"})
    // } else {
  
      const [total, personal] = await Promise.all([
        Personal.countDocuments({isActivo: true}),
        Personal.find({isActivo: true})
        // .skip(Number(desde))
        // .limit(Number(limite))
      ])
  
      res.json({ total,personal });
    // }
  };
//un solo personal
const PersonalGet = async (req = request, res = response) => {
  const {id} = req.params
  const personal = await Personal.findById(id)

    res.json({ personal });
};




const PersonalPost = async(req,res = response)=>{ 
    const {nombre,telefono,email,password,rol} = req.body
    const personal = new Personal({nombre,telefono,email,password,rol})

    //verificar correo existe
    const existeEmail = await Personal.findOne({email})
    if(existeEmail){
        return res.status(400).json({
            msg: 'El correo ya existe'
        })
    }
    //encriptar contraseña hash
    const salt = bcryptjs.genSaltSync()
    personal.password = bcryptjs.hashSync(password,salt)
    //guardar en bd


    await personal.save()

    //TODO: isActive = False para el Personal unicamente. Validación por correo isActive =true
    res.json({
        msg: 'Personal creado exitosamente',
    })
}


const PersonalPut = async (req, res = response) => {
    //Params es lo que trae la request
    const { id } = req.params;
    const { _id, password, qr,email , ...resto } = req.body;
  
    //Validar contra body
    if (password) {
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }
  
    const personal = await Personal.findByIdAndUpdate(id, resto);
  
    res.json(personal);
};

const PersonalDelete = async(req, res = response) => {
    const { id } = req.params
  
    //BORRADO FISICAMENTE
    // const usuario = await Usuario.findByIdAndDelete( id )
  
    //borrado por estado, se pasa valor a false, queda deshabilitado
    const personal = await Personal.findByIdAndUpdate(id, { isActivo: false})
  
    res.json( personal );
  };




module.exports = {
    PersonalGetAll,
    PersonalGet,
    PersonalPost,
    PersonalPut,
    PersonalDelete
};
