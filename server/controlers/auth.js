const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

const User = require('../models/user');
const emailSender = require('../util/emailSender');
const emailOptions = require('../enums/emailOptions');
const jwtManagment = require('../auth-guards/jwt-managment');

exports.registerUser = async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array()[0].msg);
    }
    const buffer = crypto.randomBytes(256);
    const confirmationToken = buffer.toString('hex');
    try {
        await emailSender(req.body.email, emailOptions.emailConfirmation, confirmationToken);
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
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
    } catch (err) {
        return res.status(422).send('Wystąpił błąd');
    }
}

exports.login = async function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({email});
        if (user) {
            if (!user.isActive) {
                return res.status(422).send('Email nie został potwierdzony');
            }
            const doMatch = await bcrypt.compare(password, user.password);
            if(doMatch) {
                return res.json(jwtManagment.jwtFactory(user));
            } 
        } 
    } catch (err) {
        return res.status(500).send('Wystąpił błąd');
    }
    return res.status(422).send('Nieprawidłowe dane logowania');
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
            return res.status(422).send('Wystąpił błąd')
        }
    }).catch(err => {
        return res.status(500).send('Wystąpił błąd')
    });
}

exports.passwordReset = async function(req, res, next) {
    const email = req.body.email;
    const buffer = crypto.randomBytes(256);
    const confirmationToken = buffer.toString('hex');
    const  resetPasswordUser = await User.findOne({ email, isActive: true });
    try {
        if (resetPasswordUser) {
            await emailSender(email, emailOptions.passwordReset, confirmationToken);
        } else {
            return res.status(422).send('Nieprawidłowy adres email');
        }
        resetPasswordUser.confirmationToken = confirmationToken;
        resetPasswordUser.save();
        return res.json('Link resetujący hasło został wysłany');
    } catch (err) {
        return res.status(500).send('Wystąpił błąd');
    }
}

exports.passwordResetAttempt = async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array()[0].msg);
    }
    const confirmationToken = req.body.token;
    const password = req.body.password;
    try {
        const resetPasswordUser = await User.findOne({ confirmationToken });
        if (resetPasswordUser) {
            const hashedPassword = await bcrypt.hash(password, 12);
            resetPasswordUser.password = hashedPassword;
            resetPasswordUser.confirmationToken = '';
            resetPasswordUser.save();
            return res.json('Twoje hasło zostało zmienione');
        } else {
            return res.status(422).send('Wystąpił błąd');
        }
    } catch(err) {
        return res.status(500).send('Wystąpił błąd');
    }
}
