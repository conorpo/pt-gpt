const sgMail = require('@sendgrid/mail');
const logger = require('../config/logger');
const jwt = require('jsonwebtoken');
require('dotenv').config();

sgMail.setApiKey(process.env.SG_API_KEY);

const sendInitialVerification = (to, user) => {
    const msg = {
        to,
        from: {
            email: "no-reply@pt-gpt.com",
            name: "PT-GPT"
        },
        template_id: process.env.SG_INITIAL_VERIFICATION_TEMPLATE_ID,
        dynamic_template_data: {
            token: jwt.sign({id: user._id, verify: true}, process.env.JWT_SECRET, {expiresIn: '1h'}),
            name: user.name
        }
    };

    sgMail.send(msg).then(() => {
        logger.info(`Email sent to ${to}`);
    }).catch((err) => {
        logger.error(err);
    });
}

const sendNewEmailVerification = (to, user) => {
    const msg = {
        to,
        from: {
            email: "no-reply@pt-gpt.com",
            name: "PT-GPT"
        },
        template_id: process.env.SG_NEW_EMAIL_VERIFICATION_TEMPLATE_ID,
        dynamic_template_data: {
            token: jwt.sign({id: user._id, verify: true, newEmail: true}, process.env.JWT_SECRET, {expiresIn: '1h'}),
            name: user.name
        }
    };

    sgMail.send(msg).then(() => {
        logger.info(`Email sent to ${to}`);
    }).catch((err) => {
        logger.error(err);
    });
}

module.exports = {
    sendInitialVerification,
    sendNewEmailVerification
}

