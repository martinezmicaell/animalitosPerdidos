//? Se necesita instalar un conector, para ello se instala Mongoose por npm: 'npm install mongoose --save'
const mongoose = require("mongoose");
require('dotenv/config')
//Punto de entrada o conexion, Mongo genera una URL que indica un sitio a conectarnos


module.exports = () => {
    //exporto una funcion anonima, que otra funcion que contiene la Conexion a la BDD

    const connect = () => {
        mongoose.connect(
            process.env.MONGO_URL,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (err) => {
                if (err) {
                    console.log("DB: Paso algun tipo de ERROR!");
                } else {
                    console.log("Conexion correcta");
                }
            }
        ); //1er arg: URL BDD, 2do arg: configuraciones, 3er arg: callback por si pasa error con esas config
    };

    connect();
};
