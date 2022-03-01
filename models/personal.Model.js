

const { Schema, model } = require('mongoose')


const PersonalSchema = Schema({

    nombre : {
        type: String,
        required: [true, 'El nombre es obligatorio']
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
    password:{
        type: String,
        required: [true, ' El password es obligatorio']
    },
    rol:{
        type: String,
        required: true,
        default: 'AUX_ROLE',
        enum: ['MASTER_ROLE','ADMIN_ROLE','AUX_ROLE']
    },
    isActivo: {
        type: Boolean,
        default: true

    },
    qr: {
        type: Boolean,
        default: false
    }

})


module.exports = model('Personal', PersonalSchema)




// master_role = admin admin
// admin_role = admin
// aux_role = Personal X