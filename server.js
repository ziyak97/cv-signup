const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

const apiKey = '78877b5a0e88168161798f1c3fa71adf-us4';
const listID = '08a394c81c';

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const JSONData = JSON.stringify(data);
    
    const options = {
        url: `https://us4.api.mailchimp.com/3.0/lists/${listID}`,
        method: 'POST',
        headers: {
            'Authorization': `ziyak ${apiKey}`,
        },
        body: JSONData
    };

    request(options, (error,response, body) => {
        if(error) {
            res.sendFile(__dirname + '/failure.html');
        } else if(response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
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