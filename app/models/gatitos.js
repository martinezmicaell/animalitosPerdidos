const mongoose = require("mongoose");

const catsScheme = new mongoose.Schema(
    {
        selected: {
            type: String,
        },
        name: {
            type: String,
        },
        img: {
            data: Buffer,
            contentType: String,
        },
        img2: {
            data: Buffer,
            contentType: String,
        },
        img3: {
            data: Buffer,
            contentType: String,
        },
        desc: {
            type: String,
        },
        phone: {
            type: String,
        }
    }
);

//? Los modelos se usan en los Controladores
module.exports = new mongoose.model("cats", catsScheme);