const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js')
let app = express();
app.use(express.static(__dirname + '/../client/dist'));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.text({ type: 'text/html' }))


app.use(function(req,res,next){
  var data='';
  req.on('data',function(chunk){
    data +=chunk;
  })
  req.on('end',function(){
    req.body=data.toString();
    next();
  })
});


app.post('/repos', function (req, res) {
  console.log('hi');
  console.log(req.body);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log(req.body.data);
  helpers.getReposByUsername(req.body, function(githubObject) {
    db.save(githubObject);
  });
  // console.log('req data', req.body);
  res.end('got here');

});

app.get('/repos', function (req, res) {
  db.fetchRepo(function(repos){

    res.json(repos);
  })

  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

