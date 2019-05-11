const parse = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js')
const express = require('express');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));

//incoming user input when they submit form
app.use(parse.text());

app.post('/repos', function (req, res) {
  console.log('hihihi');
  res.send('DID I MAKE IT');
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  //map data with db.save
  let savedData = (repos) => repos.forEach(db.save);
  github.getReposByUsername(req.body, savedData);
  res.status(200).send('post successful');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.status(200);
  db.fetch(res.send.bind(res));
});



let port = 1128;

app.listen(port, function() {
  console.log(`we are watching you from ${port}`);
});


//my test lol
app.post('/', (req, res) => {
  res.send('am i here? did i make it?');
})
