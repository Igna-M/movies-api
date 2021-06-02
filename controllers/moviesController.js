const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// const productsDataDBPath = path.resolve(__dirname, '../data/productsDB.json');
// const productsInDB = () => JSON.parse(fs.readFileSync(productsDataDBPath, 'utf-8'));
// const categoriesDataDBPath = path.resolve(__dirname, '../data/categories.json');
// const categories = JSON.parse(fs.readFileSync(categoriesDataDBPath, 'utf-8'));
// const fetch = require("node-fetch");

const moviesController = {

    // Show Form
    createMovie: function(req, res) {
        let message = 'Register a movie'
        let view = {
            message: message
        }
        return res.render('createMovie', view);
    },


    // Process Form (POST)
    newMovie: function(req, res) {
                
        const errors = validationResult(req);
        console.log(errors);
        
        // console.log(req.body);


        if (!errors.isEmpty()) {
            if (req.file){
                console.log("Entramos al if de la imagen");
                let filePath = path.resolve(__dirname,'../public/images/movies' + req.file.filename);
                fs.unlinkSync(filePath);
            }

            let message = 'Sorry, something went wrong. Try again.'

            let view = {
                message: message,
                errors: errors.mapped(),
                originalData: req.body
            }
            return res.render('createMovie', view);
        }
        
        // let dataInDB = productsInDB()
        // let lastElement = dataInDB[dataInDB.length -1];
        // let lastID = lastElement.id;
        // let nextID = lastID + 1;

        // let nuevoProducto = {
        //     id: nextID,
        //     ...req.body,
        //     image: req.file.filename
        // }

        // dataInDB.push(nuevoProducto);

        // let uploadProducts = JSON.stringify(dataInDB, null , 2);
        // fs.writeFileSync(productsDataDBPath, uploadProducts)

        // return res.redirect('/products');

        return res.send(req.body)
    },



}

module.exports = moviesController