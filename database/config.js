const mongoose = require('mongoose')


const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('DB CONECTADA');


    } catch (error) {
        console.log(error);
        throw new Error('Error al inicia la base de datos')
    }
}


module.exports = {
    dbConnection
};
