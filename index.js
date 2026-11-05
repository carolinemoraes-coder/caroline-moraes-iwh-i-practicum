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
// ROUTE 1 - Homepage: lists the custom object records in a table
app.get('/', async (req, res) => {
    const url = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT}?properties=${PROPERTIES.join(',')}&limit=100`;
    try {
        const response = await axios.get(url, { headers });
        const data = response.data.results;
        res.render('homepage', { title: 'Books | Integrating With HubSpot I Practicum', data });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Could not load the records from HubSpot.');
    }
});
// ROUTE 2 - Renders the form to create a new record
app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});
// ROUTE 3 - Sends the form data to HubSpot and redirects to the homepage
app.post('/update-cobj', async (req, res) => {
    const newRecord = {
        properties: {
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre
        }
    };
    const url = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT}`;
    try {
        await axios.post(url, newRecord, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Could not create the record in HubSpot.');
    }
});
app.listen(3000, () => console.log('Listening on http://localhost:3000'));