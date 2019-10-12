const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

const User = require('../models/user');
const emailSender = require('../util/emailSender');
const emailOptions = require('../enums/emailOptions');
const jwtManagment = require('../auth-guards/jwt-managment');

exports.registerUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array()[0].msg);
    }
    const buffer = crypto.randomBytes(256);
    const confirmationToken = buffer.toString('hex');
    emailSender(req.body.email, emailOptions.emailConfirmation, confirmationToken).then(result => {
        return bcrypt.hash(req.body.password, 12);
    })
    .then(hashedPassword => {
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            surname: req.body.surname,
            isMale: req.body.isMale,
            accessLevel: 1,
            confirmationToken,
            isActive: false
        });
        user.save()
        return res.json('Link aktywacyjny został wysłany');
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send('Wystąpił błąd');
    })
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email}).then(user => {
        if (user) {
            if (!user.isActive) {
                return res.status(500).send('Email nie został potwierdzony');
            }
            bcrypt.compare(password, user.password).then(doMatch => {
                if(doMatch) {
                    return res.json(jwtManagment.jwtFactory(user));
                } else {
                    return res.status(500).send('Nieprawidłowe dane logowania');
                }
            })
        } else {
            return res.status(500).send('Nieprawidłowe dane logowania');
        }
    }).catch(err => {
        return res.status(500).send('Nieprawidłowe dane logowania');
    });
}
