const express = require('express');
const { check, body } = require('express-validator');
const publicController = require('../controlers/public');

const router = express.Router();
const NewsletterSubscription = require('../models/newsletterSubscription');

router.post('/subscribe-newsletter', [
    check('nameAndSurname').isLength({ min: 1 }).withMessage('Podaj imie i nazwisko'),
    check('email').isEmail().withMessage('Podaj poprawny adres email').normalizeEmail()
    .custom((value, { req }) => {
        return NewsletterSubscription.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject(
                    'Ten adres email jest już zapisany na newsletter'
                  );
            }
            return true;
        }).catch(err=>{
            throw new Error(err);
        })
    })
], publicController.subscribeNewsletter);

module.exports = router;
