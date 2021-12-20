//? show this
//?https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

const express = require('express');
const db = require("./config/db");
const app = express();
const path = require('path');
const catsRoutes = require('./app/routes/gatitos');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set EJS as templating engine
// app.set("view engine", "ejs");

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/public/index.html");
// })
app.use(catsRoutes);



//?app.post



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

db(); //Se inicializa la conexion a la BDD