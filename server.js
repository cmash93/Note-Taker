const express = require('express');
const path = require('path');
const api = require('./routes/index')
// need a routes const here

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// GET Route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// Listening notification within console
app.listen(PORT, () => {
    console.log(`App listening at http//localhost:${PORT}`)
})