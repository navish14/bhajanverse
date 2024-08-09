
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit_form', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        res.status(400).send('Bad Request: Missing required fields');
        return;
    }
    const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

    const filePath = path.join(__dirname, 'formData.txt');
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        res.send('Form data saved successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
