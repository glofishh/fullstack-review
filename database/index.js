const mongoose = require('mongoose'); // mongoose is a module for mongodb, it allows us to talk to mongoDb
mongoose.connect('mongodb://localhost/fetcher');
const db = mongoose.connection;

let repoSchema = mongoose.Schema({ // using mongoose to create a schema
  id: Number,
  name: String,
  owner: String,
  description: String,
  created_At: String,
  html_url: String,
  stargazers_count:Number,
  forks:Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (githubObject) => { //githubObject is an array of objects

  var repoArray = [];
  var parsedRepos = JSON.parse(githubObject.body); //array of repo objects

  for (var i = 0; i < parsedRepos.length; i++) {
    var repoObj = {};

    repoObj.id = parsedRepos[i].id;
    repoObj.name = parsedRepos[i].name;
    repoObj.owner = parsedRepos[i].owner.login;
    repoObj.description = parsedRepos[i].description;
    repoObj.created_At = parsedRepos[i].created_at;
    repoObj.html_url = parsedRepos[i].html_url;
    repoObj.stargazers_count = parsedRepos[i].stargazers_count;
    var repo = new Repo(repoObj); //new document

    repo.save(function (err) {
      if (err) {
        console.log(err);
      }
    })

    repoArray.push(repoObj);
  }

  console.log('this is combination of Array', repoArray);

}

let fetchRepo=function(callback){
  Repo.find(function(err, repos) {
    if (err) {
      console.log(err);
    } else {
      console.log('*******', repos);
      callback(repos);
    }
  }).
  sort({'name':1}).
  limit(25)



}

module.exports.save = save;
module.exports.fetchRepo = fetchRepo;