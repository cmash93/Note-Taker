const express = require('express');
const api = require('./routes/api');
const html = require('./routes/html')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

// Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);
app.use('/', html);

// Listening notification within console
app.listen(PORT, () => {
    console.log(`App listening at http//localhost:${PORT}`)
});