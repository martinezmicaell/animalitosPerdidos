const catModel = require('../models/gatitos');
const fs = require('fs');
const path = require('path');


//?Se activa cdo el user entra a index
exports.getCat = (req, res) => {
    //?Encuentra
    catModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.sendFile("public/index.html", { root: '.', items: items });

            // res.render(__dirname + "/public/index.html", { items: items }); Añadir cuando tenga el EJS c la carpeta views
        }
    });
}

console.log('hola');
console.log('wey');
//?Capturo el form con este middleware e inserto el POST en la base de datos
exports.insertCat = (req, res, next) => {
    const files = req.files;
    console.log(files);


    if (!files) {
        const error = new Error('Elige al menos 1 foto de tu animalito perdido!');
        error.httpStatusCode = 400;
        return error;
    } else {
        const { selectAnimal, nameAnimal, descAnimal, phoneAnimal } = req.body
        let post = {
            selected: selectAnimal,
            name: nameAnimal,
            img: {
                data: fs.readFileSync(path.join('./uploads/' + req.files['imageAnimal1'][0].filename)),
                //$Poner jpeg, png
                contentType: 'image/jpg'
            },
            img2: {
                data: fs.readFileSync(path.join('./uploads/' + req.files['imageAnimal2'][0].filename)),
                contentType: 'image/jpg'
            },
            img3: {
                data: fs.readFileSync(path.join('./uploads/' + req.files['imageAnimal3'][0].filename)),
                contentType: 'image/jpg'
            },
            desc: descAnimal,
            phone: phoneAnimal,
        }

        // console.log(req.body)
        // console.log(req.files['imageAnimal1'][0].filename);
        //?Crea el documento
        catModel.create(post, (err, item) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            else {
                // item.save();
                //?ENVIAR UN RENDER DICIENDO QUE SE SUBIO CORRECTAMENTE SU POST, ESPERAR A QUE SE ENCUENTRE SU GATITO
                console.log('El formulario se subio correctamente!');
                res.redirect('/');
            }
        });
    }
}

