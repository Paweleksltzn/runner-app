const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

const User = require('../models/user');
const UserProfile = require('../models/userProfile');

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
        const userProfile = new UserProfile({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            isMale: req.body.isMale,
            accessLevel: 1,
            gradient: 1,
            imgUrl: 'assets/images/profile-picture.png',
            profileDescription: 'Wprowadź opis ...',
            invitedToFriends: [],
            friendsInvitations: [],
            friends: []
        });
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            surname: req.body.surname,
            isMale: req.body.isMale,
            nameAndSurname: req.body.name + req.body.surname,
            accessLevel: 1,
            confirmationToken,
            isActive: false,
            userProfile
        });
        userProfile.save();
        user.save()
        return res.json('Link aktywacyjny został wysłany');
    } catch (err) {
        console.log(err);
        return res.status(422).send('Wystąpił błąd');
    }
}

exports.login = async function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({email}).populate('userProfile');
        if (user) {
            if (!user.isActive) {
                return res.status(422).send('Email nie został potwierdzony');
            }
            const doMatch = await bcrypt.compare(password, user.password);
            if(doMatch) {
                const token = jwtManagment.jwtFactory(user);
                return res.json({token, userProfile: user.userProfile});
            } 
        } 
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd');
    }
    return res.status(422).send('Nieprawidłowe dane logowania');
}

exports.emailConfirmed = async function(req, res, next) {
    try {
        const token = req.body.confirmToken;
        const resetUser = await User.findOne({ confirmationToken: token });
        if (resetUser) {
            resetUser.isActive = true;
            resetUser.confirmationToken = '';
            resetUser.save();
            return res.json('Twoje konto zostało aktywowane');
        } else {
            return res.status(422).send('Wystąpił błąd')
        }
    } catch {
        console.log(err);
        return res.status(500).send('Wystąpił błąd');
    }
    
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
        console.log(err);
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
        v
        return res.status(500).send('Wystąpił błąd');
    }
}
