require('dotenv').config()

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ziyak97@gmail.com',
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: 'ziyak97@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: `Hey ${fName} ${lName}!`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            res.sendFile(__dirname + '/failure.html')
        } else {
            res.sendFile(__dirname + '/success.html')
        }
    });
});

app.post('/failure', (req, res) => {
    res.redirect('/');
});

app.post('/success', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));