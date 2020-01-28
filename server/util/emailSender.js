const nodemailer = require('nodemailer');
const emailOptions = require('../enums/emailOptions');
const credentials = require('./credentials');

const transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
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
        from: 'runnerapp123@gmail.com', // sender address
        to: receiver, // list of receivers
        subject, // Subject line
        html: emailHtmlFactory(subject, confirmToken, receiver)// plain text body
    };
    return transporter.sendMail(mailOptions)
}

const environment = 'https://fitup3.szymonpawel123.usermd.net';

const emailHtmlFactory = (subject, confirmToken, receiver) => {
    switch(subject) {
        case emailOptions.emailConfirmation: {
            return `
                <h1>Link aktywacyjny: </h1>
                <a href="${environment}/#/confirm/${confirmToken}">Aktywuj</a>
            `
        }
        case emailOptions.passwordReset: {
            return `
                <h1>Link resetujacy: </h1>
                <a href="${environment}/#/reset-password/${confirmToken}">Reset</a>
            `
        }
    }
}

