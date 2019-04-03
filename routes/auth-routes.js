const express    = require('express');
const authRoutes = express.Router();
const cors       = require('cors')
const passport   = require('passport');
const bcrypt     = require('bcryptjs');

const User       = require('../models/user-model');

///////////POST////////////////////
authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
        res.status(400).json({ message: 'Introduce Usuario y Password' });
        return;
    }

    if(password.length < 7){
        res.status(401).json({ message: 'Por seguridad tu Password debe ser al menos de 8 caracteres.' });
        return;
    }
  
    User.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "El Nombre de usuario no pudo ser validado."});
            return;
        }

        if (foundUser) {
            res.status(402).json({ message: 'Usuario existente. Pruebe con algun otro.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
            username:username,
            password: hashPass
        });
  
        aNewUser.save(err => {
            if (err) {
                res.status(403).json({ message: 'No se pudo grabar el Usuario en la base de datos.' });
                return;
            }
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Ingreso posterior a registro incorrecto.' });
                    return;
                }
            
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});

authRoutes.post('/login', (req, res, next) => {
    console.log(req);
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'No se pudo autenticar el Usuario' });
            return;
        }
    
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'No se pudo iniciar la sesión.' });
                return;
            }
            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});

authRoutes.post('/updatepassword', (req, res, next) => {
    const password = req.body.password;
    const username = req.body.username;
    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    User.updateOne({"username": username},{$set:{password: hashPass}})
    .then( () =>{
        res.status(200).json({ message: 'Update success!' });
    })
    .catch(err=>console.log(err))
});

authRoutes.post('/recuperaUsuario', (req, res, next) => { 
    const username = req.body.username;
    User.find({username: username})
      .then(usuario =>{
        if(usuario.length > 0)
            res.status(200).json(usuario[0]);
        else
            res.status(200).json({ message: 'No existe correo electronico. Favor de validar!'});
      })
      .catch(err =>{
        console.log(err)
      })
  });

//////////////////GET///////////////
authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;