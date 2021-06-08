const fs = require('fs');
const path = require('path');
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');

// const { send } = require('process');

// const usersInDBPath = path.resolve(__dirname, '../data/usersDB.json');
// const usersInDB = () => JSON.parse(fs.readFileSync(usersInDBPath, 'utf-8'));
// const permitsPath = path.resolve(__dirname, '../data/permits.json');
// const permisos = JSON.parse(fs.readFileSync(permitsPath, 'utf-8'));
// const User = require('../models/User')

const usersController = {

    users: function(req, res) {

        let message = 'Welcome to Movies App!! Please Login.';

        let view = {
            message: message
        }      
        return res.render('login', view);
    },

    login: function(req, res) {

        let message = 'Welcome to login!!';

        let view = {
            message: message
        }      
        return res.render('login', view);
    },


    // createForm: function(req, res){
        
    //     let aLaVista = {
    //         permisos: permisos
    //     }

    //     return res.render('users/createUser', aLaVista)
    // },


    

    // login: function(req, res){
        
    //     return res.render('users/login')
    // },


    // loginProcess: function(req, res){
        
    //     let userToLogin = User.findByField('email', req.body.email)

    //     if (!userToLogin){
    //         let errores = {
    //             password: {
    //                 msg: 'Los datos no concuerdan'
    //             },
    //         }
    //         let aLaVista = {
	// 			errores: errores,
	// 		}
    //         return res.render('users/login', aLaVista)
    //     } 
            
    //     let comparePassword = bcrypt.compareSync(req.body.password, userToLogin.password);

    //     if (!comparePassword){
    //         let errores = {
    //             password: {
    //                 msg: 'Los datos no concuerdan'
    //             },
    //         }
    //         let aLaVista = {
    //             errores: errores,
    //         }
    //         return res.render('users/login', aLaVista)

    //     } 
        
    //     delete userToLogin.password
    //     req.session.userLogged = userToLogin

    //     if (req.body.remember_user){
    //         res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60})
    //     }
        
    //     return res.redirect('/users/profile')
    // },


    // logout: function(req, res){
    //     res.clearCookie('userEmail')
    //     req.session.destroy()
    //     return res.redirect('/')
    // },


}

module.exports = usersController