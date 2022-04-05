

const { Schema, model } = require('mongoose')


const UsuarioSchema = Schema({

    nombre : {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    rfc: {
        type: String,
        required: [true, 'El RFC es obligatorio'],
        unique: true,
        match: [/^[ña-z]{3,4}[0-9]{6}[0-9a-z]{3}$/i]
    },
    direccion: {
        type: String,
        required: [true, 'la direccion es obligatoria']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    isActivo: {
        type: Boolean,
        default: true

    },
    qr: {
        type: Boolean,
        default: false
    },
    linkqr: {
        type: String,
    }


})



UsuarioSchema.methods.toJSON = function(){
    const {__v, _id,...usuario} = this.toObject()
    //Se cambia visualmente el uid por _id
    usuario.uid = _id
    
    return usuario
}

module.exports = model('Usuario', UsuarioSchema)






//user model
// {
//     _id
//     nombre
//     RFC
//     direccion
//     telefono
//     email
//     pass  no pq el usuario a facturar no necesita la contraseña
//     isActivo
//     qr
// }