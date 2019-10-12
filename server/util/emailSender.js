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

const emailHtmlFactory = (subject, confirmToken, receiver) => {
    switch(subject) {
        case emailOptions.emailConfirmation: {
            return `
                <h1>Link aktywacyjny: </h1>
                <a href="https://test.pl/#/confirm/${confirmToken}">Aktywuj</a>
            `
            break;
        }
        case emailOptions.passwordReset: {
            return ``
            break;
        }
    }
}

