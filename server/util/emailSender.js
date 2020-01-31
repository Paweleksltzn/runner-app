const nodemailer = require('nodemailer');
const emailOptions = require('../enums/emailOptions');
const credentials = require('./credentials');

const transporter = nodemailer.createTransport({
    host: 'mail42.mydevil.net',
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
           user: credentials.EMAIL.user,
           pass: credentials.EMAIL.pass
    }
});

module.exports =  (receiver, subject, confirmToken) => {
    const mailOptions = {
        from: 'fitup@kontakt.com', // sender address
        to: receiver, // list of receivers
        subject, // Subject line
        html: emailHtmlFactory(subject, confirmToken, receiver)// plain text body
    };
    return transporter.sendMail(mailOptions)
}

const emailHtmlFactory = (subject, confirmToken, receiver) => {
    switch(subject) {
        case emailOptions.emailConfirmation: {
            return `
                <h1>Link aktywacyjny: </h1>
                <a href="localhost:4200/#/confirm/${confirmToken}">Aktywuj</a>
            `
        }
        case emailOptions.passwordReset: {
            return `
                <h1>Link resetujacy: </h1>
                <a href="localhost:4200/#/reset-password/${confirmToken}">Reset</a>
                <p>localhost:4200/#/reset-password/${confirmToken}">Reset</p>
            `
        }
    }
}

