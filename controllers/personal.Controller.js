const {response} = require('express')
const Personal = require('../models/personal.Model')
const bcryptjs = require('bcryptjs');
// const { Role } = require('../models');

const PersonalGetAll = async (req = request, res = response) => {

  
      let personal = await Personal.find({isActivo: true}).populate({path: "rol"})

      personal = personal.filter((persona)=> persona.rol.rol != "MASTER_ROLE")

  
      res.json({ personal });
    // }
};



  //eliminados
const PersonalGetAllEliminados = async (req = request, res = response) => {

  
    const [total, personals] = await Promise.all([
      Personal.countDocuments({isActivo: false}),
      Personal.find({isActivo: false})
    ])

    res.json({ total,personals });
};


//un solo personal
const PersonalGet = async (req = request, res = response) => {
  const {id} = req.params
  
  
   const personal = await Personal.findById(id).populate({
      path: 'rol',
      strictPopulate:false,
      
    })
  
  // delete personal.password

  res.json({ personal });
};




const PersonalPost = async(req,res = response)=>{ 
    const {nombre,telefono,email,password,rol} = req.body
    const personal = new Personal({nombre,telefono,email,password,rol})

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
    const { id } = req.params;
    const { _id, password, qr,email, ...resto } = req.body;
  
    
    const personal = await Personal.findByIdAndUpdate(id, resto,{new: true}).populate({path: "rol"});
  
    res.json(personal);
};

const PersonalDelete = async(req, res = response) => {
    const { id } = req.params
    const rol = await Personal.findById(id).populate({path:"rol"})
    const isMaster = rol.rol.rol
    isMaster == "MASTER_ROLE"
    ? res.json({msg: "No se puede eliminar MASTER_ROLE"})
    : (await Personal.findByIdAndUpdate(id, { isActivo: false}),
      res.json( {msg: "Personal eliminado correctamente"}))
  };


  const PersonalDeletePermanente = async(req,res = response)=>{
    const { id } = req.params
  
    //BORRADO FISICAMENTE

    const rol = await Personal.findById(id).populate({path: "rol"})
    // console.log(rol.rol.rol);
    const isMaster = rol.rol.rol

    isMaster == "MASTER_ROLE"  
    ? res.json({msg: "No se puede eliminar MASTER_ROLE"}) 
    : (await Personal.findByIdAndDelete(id),
    
      res.json({msg: "Personal Eliminado Definitivamente"}))
    
  }
  

  const PersonalActive = async(req, res = response) =>{

    const { id } = req.params
    const personal = await Personal.findByIdAndUpdate(id, { isActivo: true})
    personal.isActivo == true
    ? res.json({msg:"EL personal ya se encuentra activo"})
    : res.json({msg: "Personal reactivado correctamente"})
    
  }
  
  



module.exports = {
    PersonalGetAll,
    PersonalGet,
    PersonalPost,
    PersonalPut,
    PersonalDelete,
    PersonalDeletePermanente,
    PersonalGetAllEliminados,
    PersonalActive
  };
