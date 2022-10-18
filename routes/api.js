const api = require('express').Router();
const fs = require('fs');
const util = require('util');
const uuid = require('uuid');
const readFromFile = util.promisify(fs.readFile);
let db = require('../db/db.json');


// GET Route for retrieving notes
api.get('/notes', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => {
        res.json(JSON.parse(data))
    })
});

// POST Route for new note
api.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid.v4()   
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Note successfully created!')
                    }
                })
            }
        })
    }
});

// DELETE note
// api.delete('/', (req, res) => {

// });

module.exports = api;