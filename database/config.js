const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.MONGODB , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Conectados a la base de datos ${process.env.MONGODB}`);
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo conectar con la Base de Datos');
    }
};

module.exports = {
    dbConnection,
}