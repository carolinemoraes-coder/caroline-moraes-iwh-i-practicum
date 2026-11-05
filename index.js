require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Private app token comes from the .env file (never commit it)
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

// Custom object type ID, taken from the object's list view URL
const CUSTOM_OBJECT = '2-72258901';
const PROPERTIES = ['name', 'author', 'genre'];

const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json'
};

// ROUTE 2 - Renders the form to create a new record
app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));