const notes = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');
const util = require('util');

let data = require('../db/db.json');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// GET Route for retrieving notes
notes.get('/notes', (req, res) => {
    res.json(data)
});

// POST Route for new note
notes.post('/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuid.v4();

    data.push(newNote);
    writeFileAsync('./db/db.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send(newNote)
        }
    })
});

// DELETE note
// notes.delete('/', (req, res) => {

// });

module.exports = notes;