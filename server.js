var express = require('express'),
  bodyParser = require('body-parser');
const db = require('./models');
// generate a new express app and call it 'app'
var app = express();
app.use(express.json());
// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find({},(err,data)=>{
    res.json(data);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  db.Book.findById(req.params.id,(err,data)=>{
    if(!err){
      res.json(data);
    }else{
      console.log('error');
    }
  })
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  const newBook = {
      title: req.body.title,
      author:req.body.author,
  }
  db.Book.create(newBook,(err,data)=>{
    if(!err){
      res.json(data);
    }else{
      res.send('request fail');
    }
  });
 
});

// update book
app.put('/api/books/:id', function(req,res){
  db.Book.findByIdAndUpdate(req.params.id,req.body,(err,data)=>{
    if(!err){
      res.json(data);
    }else{
      res.send('fail');
      console.log('update fail');
    }
  });
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  db.Book.findByIdAndDelete(req.params.id,(err,data)=>{
    if(!err){
        res.json(data);
    }else{
      res.send('fail');
    }
  });
});





app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
