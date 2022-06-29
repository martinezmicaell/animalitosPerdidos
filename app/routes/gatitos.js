const e = require("express");
const express = require("express");
const multer = require("multer");
const controller = require("../controllers/gatitos");
const catModel = require('../models/gatitos');
const router = express.Router();

//Las imagenes que llegan del POST se guardan en /uploads
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        // console.log(file);
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
const options = {
    img: 0,
    img2: 0,
    img3: 0
}

//Show the Home Page
router.get("/", paginatedResults(catModel), controller.getCat);

router.get("/test", paginatedResults(catModel), controller.test);

router.get("/testWithImages", paginatedResults(catModel), controller.testWithImages);

router.post("/gatitos", multipleUpload, controller.insertCat);

//Sends 404 page
router.get("*", controller.notFound)
module.exports = router;






function paginatedResults(posts, options = false) {
    return async (req, res, next) => {
        const { page = 1 } = req.query;
        const { limit = 8 } = req.query

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {}


        if (endIndex < await posts.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                urlNext: `/test?page=${Number(page + 1)}&limit=${limit}`,
                limit: limit
            }
        }


        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                urlNext: `/test?page=${page - 1}&limit=${limit}`,
                limit: limit
            }
        }

        try {
            results.results = await posts.find({}, options).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results;

            next()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}