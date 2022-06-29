const catModel = require('../models/gatitos');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const PUBLIC_URL = process.env.PUBLIC_URL;

//?Se activa cdo el user entra a index


exports.getCat = async (req, res) => {
    //?Encuentra
    // const { page = 1, limit = 8 } = req.query;

    try {
        // const posts = await catModel.find()
        //     .limit(limit * 1) //es el número de documentos que queremos recuperar
        //     .skip((page - 1) * limit) //es la cantidad de documentos que queremos omitir antes de recuperar nuestros documentos. Para saltar, tomamos la página y restamos uno, luego lo multiplicamos por el límite
        //     .exec();

        // const count = await catModel.countDocuments();

        // res.render("pages/index", { items: posts, count: count, totalPages: Math.ceil(count / limit), currentPage: page });
        res.render("pages/index", results = res.paginatedResults)

    } catch (err) {
        console.log(err)
    }
    // .sort({ createdAt: 'desc' });
}

//?Capturo el form con este middleware e inserto el POST en la base de datos
exports.insertCat = async (req, res, next) => {
    const files = req.files;
    res.status(200)


    if (!files) {
        const error = new Error('Elige al menos 1 foto de tu animalito perdido!');
        error.httpStatusCode = 400;
        return error;
    } else {
        //Al hacer click en el button submit del formPost, se almacena en req.body los atributos name de abajo, ej: selectAnimal
        //Usamos al fs para leer el sistema de archivo local (/uploads) y luego almacenarlo en la DB
        const { selectAnimal, nameAnimal, descAnimal, phoneAnimal } = req.body
        let post = {
            selected: selectAnimal,
            name: nameAnimal,
            img: {
                // data: fs.readFileSync(path.join('./uploads/' + req.files['imageAnimal1'][0].filename)),
                filename: files['imageAnimal1'][0].filename,
                url: `${PUBLIC_URL}${files['imageAnimal1'][0].filename}`,
                //$Poner jpeg, png
                contentType: 'image/jpg'
            },
            img2: {
                // data: fs.readFileSync(path.join('./uploads/' + req.files['imageAnimal2'][0].filename)),
                filename: files['imageAnimal2'][0].filename,
                url: `${PUBLIC_URL}${files['imageAnimal2'][0].filename}`,
                contentType: 'image/jpg'
            },
            img3: {
                // data: fs.readFileSync(path.join('./uploads/' + req.files['imageAnimal3'][0].filename)),
                filename: files['imageAnimal3'][0].filename,
                url: `${PUBLIC_URL}${files['imageAnimal3'][0].filename}`,
                contentType: 'image/jpg'
            },
            desc: descAnimal,
            phone: phoneAnimal,
        }

        // console.log(req.body)
        // console.log(req.files['imageAnimal1'][0].filename);
        //?Crea el documento
        const data = await catModel.create(post, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                // item.save();
                //?ENVIAR UN RENDER DICIENDO QUE SE SUBIO CORRECTAMENTE SU POST, ESPERAR A QUE SE ENCUENTRE SU GATITO
                // console.log(post)
                console.log('El formulario se subio correctamente!');
                res.redirect('/');
            }
        });
        // res.send({ data })
    }
}

exports.notFound = (req, res) => {
    res.status("404").sendFile("404.html", { root: path.join('public') })
}


/* ***** DE PRUEBA ***** */
exports.test = async (req, res) => {
    //?Encuentra
    // const page = parseInt(req.query.page)
    // const limit = parseInt(req.query.limit)

    res.json(res.paginatedResults)

    // try {
    //     const posts = await catModel.find({}, { img: 0, img2: 0, img3: 0 }) //retornar los posts sin Imagenes
    //         .limit(limit * 1) //es el número de documentos que queremos recuperar
    //         .skip((page - 1) * limit) //es la cantidad de documentos que queremos omitir antes de recuperar nuestros documentos. Para saltar, tomamos la página y restamos uno, luego lo multiplicamos por el límite
    //         .exec();

    //     const count = await catModel.countDocuments();

    //     res.json({ posts, count });

    // } catch (err) {
    //     console.log(err)
    // }
    // .sort({ createdAt: 'desc' });
}

exports.testWithImages = (req, res) => {
    try {
        res.render("pages/test", results = res.paginatedResults)

    } catch (e) {
        console.log(e)
    }
}

