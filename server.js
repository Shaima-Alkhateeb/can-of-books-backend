'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

// routes
app.get('/', handleHome);
app.get('/books', handleGetBook);
// app.get('/findBookbyName', handleFindBook);


// handlers functions:
function handleHome(req, res) {
  res.send('Hello from handleHome');
}

// when I receive a req from react app on "http://localhost:3001/Book", the handleGetBook will be called
function handleGetBook(req, res) {
  // send a req to the mongoDB server to recive the Book data
  BookModel.find({}, (error, data) => {
      if (error) console.log(`error reading from the db: ${error}`);
      else res.send(data);
  })
}

// http://localhost:3001/findCatbyName?name=tomas&isAdopted=true
// function handleFindCat(req, res) {
//   const catName = req.query.name;
//   const isAdopted = req.query.isAdopted;

//   BookModel.find({ "name": catName, "isAdopted": isAdopted }, (error, data) => {
//       if (error) console.log(`error finding the cat in the db: ${error}`);
//       else res.send(data);
//   })    
// }


// Dtabase code
// sudo service mongodb start
// 1. connect my express server to the mongodb server using mongoose(uri of the db/name of db)
mongoose.connect('mongodb://localhost:27017/bookDB');

// 2. create a schema for the data I want to store in the database
const bookShema = new mongoose.Schema({
  // filed name : data type of this field
  title: String,
  description: String,
  status: String
});

// 3. create a model for the schema (name of model/collection, name of schema)
// for each collection I need to crate a new model
const BookModel = mongoose.model('BookModel', bookShema);

// create new document(I should crate new instance of model)
const Book1 = new BookModel({
  title: 'Good To Great',
  description: 'Good To Great examines what it takes for ordinary companies to become great and outperform their competitors by analyzing 28 companies over 30 years, who managed to make the transition or fell prey to their bad habits.',
  status: 'LIFE-CHANGING'
});

// another document
const Book2 = new BookModel({
  name: 'The Growth Mindset ',
  description: 'A growth mindset means that you thrive on challenge, and dont see failure as a way to describe yourself but as a springboard for growth and developing your abilities. Your intelligence and talents are all susceptible to growth.',
  status: 'LIFE-CHANGING'
})

const Book3 = new BookModel({
  name: 'The Blind Assassin',
  description: 'it is a science fiction story told by two unnamed lovers who meet in dingy backstreet rooms. When we return to Iris, it is through a 1947 newspaper article announcing the discovery of a sailboat carrying the dead body of her husband, a distinguished industrialist.',
  status: 'LIFE-CHANGING'
})


console.log(Book1);
console.log(Book2);
console.log(Book3);
// save to the db
// Book1.save();
// Book2.save();
// Book3.save();


app.get('/test', (request, response) => {

  // response.send('test request received')
  console.log(`listening on ${PORT}`);

})

// app.listen(PORT, () => console.log(`listening on ${PORT}`));
