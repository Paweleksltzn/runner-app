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

exports.emailConfirmed = (req, res, next) => {
    const token = req.body.confirmToken;
    let resetUser;
    User.findOne({ confirmationToken: token }).then(user => {
        if (user) {
            resetUser = user;
            resetUser.isActive = true;
            resetUser.confirmationToken = '';
            resetUser.save();
            return res.json('Twoje konto zostało aktywowane');
        } else {
            return res.status(500).send('Wystąpił błąd')
        }
    }).catch(err => {
        return res.status(500).send('Wystąpił błąd')
    });
}

exports.passwordReset = (req, res, next) => {
    const email = req.body.email;
    const buffer = crypto.randomBytes(256);
    const confirmationToken = buffer.toString('hex');
    let resetPasswordUser;

    User.findOne({ email, isActive: true }).then(user => {
        if (user) {
            resetPasswordUser = user;
            return emailSender(email, emailOptions.passwordReset, confirmationToken);
        } else { 
            return res.status(500).send('Nieprawidłowy adres email');
        }
    }).then(result => {
        resetPasswordUser.confirmationToken = confirmationToken;
        resetPasswordUser.save();
        return res.json('Link resetujący hasło został wysłany');
    }).catch(err => {
        return res.status(500).send('Wystąpił błąd');
    });
}

exports.passwordResetAttempt = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array()[0].msg);
    }
    let resetPasswordUser;
    const confirmationToken = req.body.token;
    const password = req.body.password;
    User.findOne({ confirmationToken }).then(user => {
        if (user) {
            resetPasswordUser = user;
            return bcrypt.hash(password, 12)
        } else {
            return res.status(500).send('Wystąpił błąd')
        }
    }).then(hashedPassword => {
        resetPasswordUser.password = hashedPassword;
        resetPasswordUser.confirmationToken = '';
        resetPasswordUser.save();
        return res.json('Twoje hasło zostało zmienione');
    }).catch(err => {
        return res.status(500).send('Wystąpił błąd');
    });
}
