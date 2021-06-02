const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// const productsDataDBPath = path.resolve(__dirname, '../data/productsDB.json');
// const productsInDB = () => JSON.parse(fs.readFileSync(productsDataDBPath, 'utf-8'));
// const categoriesDataDBPath = path.resolve(__dirname, '../data/categories.json');
// const categories = JSON.parse(fs.readFileSync(categoriesDataDBPath, 'utf-8'));
// const fetch = require("node-fetch");

const moviesController = {
    createMovie: function(req, res) {
        let message = 'Register a movie'
        let view = {
            message: message
        }
        return res.render('createMovie', view);
    },


    newMovie: function(req, res) {
                
        const errores = validationResult(req);
        console.log(errores);

        // if (!errores.isEmpty()) {
        //     if (req.file){
        //         // console.log("Entramos al if de la imagen");
        //         let filePath = path.resolve(__dirname,'../public/images/uploads/products/' + req.file.filename);
        //         fs.unlinkSync(filePath);
        //     }

        //     let aLaVista = {
        //         categories: categories,
        //         errores: errores.mapped(),
        //         originalData: req.body
        //     }
        //     return res.render('products/create', aLaVista);
        // }
        
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