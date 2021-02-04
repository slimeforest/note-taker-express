const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

const app =  express();
const PORT = 9005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function(err, contents) {
    var words = JSON.parse(contents);
    res.send(words);
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json',(err, data) => {
    if (err) throw err;
    let json = JSON.parse(data);
    let note = {
      title: req.body.title,
      text: req.body.text,
      id: uuid()
    }
    json.push(note);

    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      if (err) throw err;
      res.send('200');
    });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('db/db.json',(err, data) => {
    if (err) throw err;
    let deleteId = req.params.id;
    let json = JSON.parse(data);
    json.forEach((item, i) =>{
      if (item.id.includes(deleteId)){ 
        json.splice(i, 1);       
      }
    });
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      if (err) throw err;
      res.send('200');
    });
  });
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function() {
  console.log("App listening on PORT http://localhost:" + PORT);
});