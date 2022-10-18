const api = require('express').Router();
const fs = require('fs');
const util = require('util');
const {v4 : uuidv4} = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
let db;


// GET Route for retrieving notes
api.get('/notes', (req, res) => {
    readFileSync('db/db.json', 'utf8')
    .then((data) => {
        db = JSON.parse(data)
        res.json(db)
    })
});

// POST Route for new note
api.post('/notes', (req, res) => {
    readFileAsync('db/db.json', 'utf8')
    .then((data) => {
        db = JSON.parse(data)

        let newNote = req.body;
        newNote.id = uuidv4();
        console.log(newNote.id);
    
        data.push(newNote);
        db = JSON.stringify(db);

        writeFileAsync('./db/db.json', db)
        .then((data) => {
            console.log('Note has been added successfully') 
        });
        res.send(db)
    });
});

// DELETE note
// api.delete('/', (req, res) => {

// });

module.exports = api;