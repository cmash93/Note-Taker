const notes = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

let data = require('../db/db.json');


// GET Route for retrieving notes
notes.get('/notes', (req, res) => {
    res.json(data)
});

// POST Route for new note
notes.post('/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuid.v4();

    data.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(data, null, 4), (err) => {
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