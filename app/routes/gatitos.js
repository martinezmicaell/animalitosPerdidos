const express = require("express");
const multer = require("multer");
const controller = require("../controllers/gatitos");
const router = express.Router();

//procesado de imagenes y guardado en carpeta upload
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb("Not an image! Please upload only images.", false);
    }
}

//?Carga de imagenes, usa funcioens creadas arriba
let upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 }, fileFilter: fileFilter });
//procesado de imagenes

let multipleUpload = upload.fields([{ name: 'imageAnimal1', maxCount: 1 }, { name: 'imageAnimal2', maxCount: 1 }, { name: 'imageAnimal3', maxCount: 1 }]);


// Ruta: /user GET, si viene con el path /user, me va a llamar a un controlador de la carpeta controllers
router.get("/", controller.getCat);

router.post("/", multipleUpload, controller.insertCat);

module.exports = router;
