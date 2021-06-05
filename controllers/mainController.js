const fetch = require("node-fetch");

const mainController = {


    login: function(req, res) {
        let view = {
            message: message
        }      
        return res.render('login', view);
    },


    index: function(req, res) {
        
        var hostname = req.headers.host; // hostname = 'localhost:3000'
        let apiMoviesUrl = 'http://' + hostname + '/api/moviesFront'
        let apiCharactersUrl = 'http://' + hostname + '/api/charactersFront'
        let apiGenresUrl = 'http://' + hostname + '/api/genresFront'


        Promise.all([fetch(apiMoviesUrl), fetch(apiCharactersUrl), fetch(apiGenresUrl)])
            .then(function(responses){
                return Promise.all(responses.map(function (response) {
                    return response.json();
                }));
            }).then(function (data) {
                
                let message = 'Un botón para activar las listas (Movies - Characters)'

                let view = {
                    message: message,
                    movies: data[0].data,
                    characters: data[1].data,
                    genres: data[2].data
                }
        
                // console.log(view);

                return res.render('index', view)

            }).catch(function (error) {
                
                let message = 'There has been an error'
                let view = {
                    message: message,
                    error: error
                }
                return res.render('error', view)
            })



        // let urls = [
        //     apiMoviesUrl,
        //     apiCharactersUrl,
        //     apiGenresUrl
        //   ];

        // let moviesFetched = fetch(apiMoviesUrl);
        // let charactersFetched = fetch(apiCharactersUrl);
        // let genresFetched = fetch(apiGenresUrl);

        // console.log(moviesFetched);
        // console.log(charactersFetched);
        // console.log(genresFetched);
    
    },


    index_3: function(req, res) {
        
        let message = 'Un botón para activar las listas (Movies - Characters)'

        let view = {
            message: message,
            movies: ''
        }





        // let getCategorias = Categories.findAll(
        //     {
        //     include: [{association: 'productos'}]
        // })
        
        // let getProductos = Products.findAll({
        //     include: [{association: 'categories'}]
        // })
        
        // Promise.all([getCategorias, getProductos])




        
        var hostname = req.headers.host; // hostname = 'localhost:3000'
        // var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'

        let apiUrl = 'http://' + hostname + '/api/moviesFront'

        fetch(apiUrl)
            .then(function(response){
                return response.json()
            })
            .then(function(frontMovies){
                let movies = frontMovies.data

                view.movies = movies
                // let seleecion_2 = seleecion_1.filter(prod => prod.amount != 0)
                
                // precios = []
                // for (let i = 0; i < seleecion_2.length; i++){
                //     precios.push(seleecion_2[i].price)
                // }
                // precios.sort().reverse()
                
                // let mostrarNProductos = 4
                // let showProducts = []
                // for (let i = 0; i < mostrarNProductos; i++){
                //     showProducts.push(seleecion_2.filter(prod => prod.price == precios[i])[0])
                // }

                // let aLaVista = {
                //     products: showProducts
                // }
                
                // // return res.send(aLaVista)
                // return res.render('index', aLaVista);
            })
            .catch(function(error){
                console.log('Catch Activado! Hubo un error');
                return res.send('Hubo un error')
            })
        
        return res.send(view)
        // return res.render('index', view);
        // return res.render('index', view);
    },
    










    productCart: function(req, res) {
        return res.render('productCart');
    },


    productDetail:function(req, res) {
        let productID = req.params.id
        var hostname = req.headers.host; // hostname = 'localhost:3000'
        // let apiUrl = 'http://' + hostname + '/products/api/product/' + productID
        let apiUrlTodos = 'http://' + hostname + '/products/api/productsList'
        
        fetch(apiUrlTodos)
            .then(function(response){
                return response.json()
            })
            .then(function(producto){

                function getRandomInt(max) {
                    return Math.floor(Math.random() * max);
                }

                let resultados = producto.data

                let miProducto = resultados.find(prod => prod.id == productID)

                let otrosProductos = resultados.filter(prod => prod.id != productID)
                let cantProductos = otrosProductos.length
                let random_1 = getRandomInt(cantProductos)
                let random_2 = getRandomInt(cantProductos)

                if (random_1 == random_2){
                    while (random_1 == random_2) {
                        random_2 = getRandomInt(cantProductos)
                        console.log('');
                        console.log('');
                        console.log('Random1', random_1);
                        console.log('Random2', random_2);
                        console.log('');
                    }
                }
                
                let aLaVista = {
                    product: miProducto,
                    otroProducto_1: otrosProductos[random_1],
                    otroProducto_2: otrosProductos[random_2]
                }
                
                return res.render('productDetail', aLaVista);
            })
            .catch(function(error){
                console.log('Catch Activado! Hubo un error');
                return res.send('Hubo un error')
            })


        // return res.render('productDetail');
    },


    productDetail_backUp:function(req, res) {
        let productID = req.params.id
        var hostname = req.headers.host; // hostname = 'localhost:3000'
        let apiUrl = 'http://' + hostname + '/products/api/product/' + productID

        
        fetch(apiUrl)
            .then(function(response){
                return response.json()
            })
            .then(function(producto){
                let aLaVista = {
                    product: producto
                }
                
                // return res.send(aLaVista);
                return res.render('productDetail', aLaVista);
            })
            .catch(function(error){
                console.log('Catch Activado! Hubo un error');
                return res.send('Hubo un error')
            })

        // return res.render('productDetail');
    },

    register:function(req, res) {
        return res.render('register');        
    },
}


module.exports = mainController