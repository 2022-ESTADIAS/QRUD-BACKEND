

const { Schema, model, mongoose } = require('mongoose')


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
        type: mongoose.Types.ObjectId,
        ref:"Role",
        required:[true,"La referencia del rol es requerida"],
    },
    isActivo: {
        type: Boolean,
        default: true

    }

})

PersonalSchema.methods.toJSON = function(){
    const {__v,password,_id, ...personal} = this.toObject()
    //Se cambia visualmente el uid por _id
    personal.uid = _id
    return personal
}



module.exports = model('Personal', PersonalSchema)

