const nodemailer = require('nodemailer');

const EMAIL = "emailver0506@gmail.com"
const EMAIL_PASSWORD = "hrasclhpqvztwyzu"

const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || EMAIL,
        pass: process.env.EMAIL_PASSWORD || EMAIL_PASSWORD
    }
});

module.exports = mail;
