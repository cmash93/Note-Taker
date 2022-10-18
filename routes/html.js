const path = require('path');
const html = require('express').Router();

// GET Route for notes.html
html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// GET Route wild card - any result not ending in "/notes" will default to index.html
html.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = html;
