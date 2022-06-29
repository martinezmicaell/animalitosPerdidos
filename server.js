//? show this
//?https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

const express = require('express');
const db = require("./config/db");
const app = express();
const cors = require('cors')
const path = require('path');
const catsRoutes = require('./app/routes/gatitos');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));
//! esto sacarlo si no funciona el codigo, es para hacer publicas las imagenes y acceder a traves del dominio http://localhost:3002/imgUrl
app.use(express.static('uploads'));

app.set("view engine", "ejs");
app.set('views', path.join('public/views')); //redefine express defaults settings
// app.set("views", __dirname + "public/views");

//Set EJS as templating engine
// app.set("view engine", "ejs");

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/public/index.html");
// })

app.use(catsRoutes);


//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

//https://www.geeksforgeeks.org/express-js-res-render-function/

//https://dev.to/shubhambattoo/uploading-files-to-mongodb-with-gridfs-and-multer-using-nodejs-5aed
//?app.post



app.listen(port, () => {
    const ip = '192.168.1.103'
    console.log(`Server started on port: http://${ip}:${port}`);
});

db(); //Se inicializa la conexion a la BDD