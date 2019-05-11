const mongoose = require('mongoose'); //mongo
mongoose.connect('mongodb://localhost/fetcher');

//define schema
//https://docs.mongodb.com/manual/core/index-unique/
let repoSchema = mongoose.Schema({
  _id: Number, //repo.id
  name: String, //repo.name
  owner: String, //repo.owner.login
  url: String, //repo.html_url
  // created_at: {
  //   type: Date,
  //   //`Date.now() returns current unix timestsamp as a number
  //   // subtract date.now from "created_at"
  //   default: Date.now
        ////////////////////////////////
        //   var schema = new Schema({
        //   title: String,
        //   date: {
        //     type: Date,
        //     // `Date.now()` returns the current unix timestamp as a number
        //     default: Date.now
        //   }
        // });

        // var BlogPost = db.model('BlogPost', schema);

        // var post = new BlogPost({title: '5 Best Arnold Schwarzenegger Movies'});

        // // The post has a default Date set to now
        // assert.ok(post.date.getTime() >= Date.now() - 1000);
        // assert.ok(post.date.getTime() <= Date.now());
        ////////////////////////////////
  // },
  description: String, //repo.description
  stargazers_count: Number, //repo.stargazers_count
  forks_count: Number //repo.forks_count
});

//compile schema to model
let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //https://mongoosejs.com/docs/api.html#model_Model-save
  //inserting doc into db: https://www.tutorialkart.com/nodejs/mongoose/insert-document-to-mongodb/

  //a document instance
  var doc = new Repo({
    _id: data.id,
    name: data.name,
    owner: data.owner.login,
    url: data.html_url,
    description: data.description,
    stargazers_cout: data.stargazers_count,
    forks_count: data.forks_count
  })

  //save model to database
  // book1.save(function (err, book) {
  //   if (err) return console.error(err);
  //   console.log(book.name + " saved to bookstore collection.");
  // });
  
  // doc.save()
  //   .then(doc =>
  //     console.log('yay ' + doc + ' successfully saved')
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })
  doc.save(err => { if (err) return console.log(err) });
  }

  let fetch = (callback) => {
    let cb = (err, repos) => { callback(repose) };
    Repo.find(cb).sort('-stargazers_count').limit(25);
  }
// Repo
//   .find(repos)
//   .sort('-stargazers_count').limit(25);
//   })
//   .limit(25);
//   })

module.exports.save = save;
module.exports.fetch = fetch;