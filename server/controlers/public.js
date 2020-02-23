const NewsletterSubscription = require('../models/newsletterSubscription');
const { validationResult } = require('express-validator');

exports.subscribeNewsletter = async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({message: errors.array()[0].msg});
    }
    try {
        const newSubscription = new NewsletterSubscription({
            nameAndSurname: req.body.nameAndSurname,
            email: req.body.email,
            registrationDate: new Date()
        });
        newSubscription.save();
        return res.status(200).json({message: 'Zapisaliśmy cię do naszego newslettera'});
    } catch(err) {
        console.log(err);
        return res.status(500).send({message: 'Nie udało się zapisać do newslettera'});
    }
}
