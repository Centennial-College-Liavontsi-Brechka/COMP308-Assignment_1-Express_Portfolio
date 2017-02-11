/**
 * @author Liavontsi Brechka
 * @studentID 300800345
 * @date April 10, 2017
 * @description Personal Portfolio websit component
 */

let express = require('express');
let nodemailer = require('nodemailer');
let config = require('config');

let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Home'
    });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
    res.render('index', {
        title: 'About',
    });
});

/* GET products page. */
router.get('/projects', (req, res, next) => {
    res.render('index', {
        title: 'Projects'
    });
});

/* GET services page. */
router.get('/services', (req, res, next) => {
    res.render('index', {
        title: 'Services'
    });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
    res.render('index', {
        title: 'Contact',
        messageSent: false
    });
});


// POST contact handler
router.post('/contact', (req, res, next) => {
    let mailOptions;
    let smtpTransport;

    // Setting up Nodemailer transport
    smtpTransport = nodemailer.createTransport({
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use TLS
        auth: {
            user: config.get("email"),
            pass: config.get("password")
        }
    });

    // Setting up mail options
    mailOptions = {
        from: `${req.body.first_name} ${req.body.last_name} <${req.body.email}>`,
        to: config.get("email"),
        subject: 'Portfolio contact me form',
        text: `${req.body.message}\n Sent by: ${req.body.first_name} ${req.body.last_name} <${req.body.email}>`
    };

    // Sending email
    smtpTransport.sendMail(mailOptions, (error, response) => {
        // Email not sent case
        if (error) {
            res.render('index', {
                title: 'Contact',
                messageSent: true,
                error: true
            })
        }
        // Email sent
        else {
            res.render('index', {
                title: 'Contact',
                messageSent: true,
                error: false
            })
        }
    });
});

module.exports = router;
