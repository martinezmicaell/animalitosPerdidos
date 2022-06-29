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
            filename: String,
            url: String,
            contentType: String,
        },
        img2: {
            filename: String,
            url: String,
            contentType: String,
        },
        img3: {
            filename: String,
            url: String,
            contentType: String,
        },
        desc: {
            type: String,
        },
        phone: {
            type: String,
        }
    }, {
    timestamps: true,
    versionKey: false
});

//? Los modelos se usan en los Controladores
module.exports = new mongoose.model("cats", catsScheme);