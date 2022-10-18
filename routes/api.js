const api = require('express').Router();
const fs = require('fs');
const util = require('util');
const uuid = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// GET Route for retrieving notes
api.get('/notes', (req, res) => {
    readFileSync('db/db.json', 'utf8')
    .then((data) => {
        res.json(data)
    })
});

// POST Route for new note
api.post('/notes', (req, res) => {
    readFileAsync('db/db.json', 'utf8')
    .then((data) => {

        let newNote = req.body;
        newNote.id = uuid.v4();
    
        data.push(newNote);
        writeFileAsync('./db/db.json', JSON.stringify(data))
        .then((err) => {
            if (err) {
                console.log(err)
            } else { console.log('Note has been added successfully') }
        });
        res.send(data)
    });
});

// DELETE note
// api.delete('/', (req, res) => {

// });

module.exports = api;