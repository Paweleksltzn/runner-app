const express = require('express');
const { check, body } = require('express-validator');

const authenticationController = require('../controlers/auth');

const router = express.Router();
const jwtManager = require('../auth-guards/jwt-managment');
const User = require('../models/user');

router.post('/signup', [
    check('name').isLength({ min: 3 }).withMessage('Podaj prawidłowe imię'),
    check('surname').isLength({ min: 3 }).withMessage('Podaj prawidłowe nazwisko'),
    check('email').isEmail().withMessage('Podaj poprawny adres email').normalizeEmail()
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject(
                    'Ten adres email jest już używany'
                  );
            }
            return true;
        }).catch(err=>{
            throw new Error(err);
        })
    }),
    check('isMale').custom((value, { req })=> {
        if (value === undefined) {
            throw new Error('Wybierz płeć');
        }
        return true;
    }),
    check('password').isLength({ min: 8 }).withMessage('Hasło musi mieć co najmniej 8 znaków'),
    check('confirmedPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Hasła muszą być identyczne!');
          }
        return true;
    })
], authenticationController.registerUser);

router.post('/login', [
    check('email').normalizeEmail()
 ],authenticationController.login);

 router.post('/autoLogin', authenticationController.autoLogin);

 router.post('/emailConfirmed', authenticationController.emailConfirmed);
 router.put('/password/reset', authenticationController.passwordReset);
 
 router.post('/password/reset/attempt', [
     check('password').isLength({ min: 8 }).withMessage('Hasło musi mieć co najmniej 8 znaków'),
     check('confirmPassword').custom((value, { req }) => {
         if (value !== req.body.password) {
             throw new Error('Hasła muszą być identyczne!');
           }
         return true;
     }),
 ], authenticationController.passwordResetAttempt)

module.exports = router;
