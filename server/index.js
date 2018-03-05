require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const recipe = require('../database-mongo/RecipeIDData.js');
const recipeList = require('../database-mongo/RecipeListData.js');
const twilioHelpers = require('../helpers/twilioHelpers.js');
const spoonacularHelpers = require('../helpers/spoonacularHelpers.js');
const db = require('../database-mongo/index.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/db/save', (req, res) => {
  var documentObj = req.body;
  //sample body object
  //{ username: 'greg7',
  //   id: '1242414',
  //   title: 'food',
  //   image: 'awesomepic.jpg',
  //   likes: '1351563'
  // }
  console.log(documentObj);
  db.save(documentObj)
    .then(response => res.send('saved to db'));
});

app.get('/db/fetch', (req, res) => {
  //localhost:3000/db/fetch?username=username
  var username = req.query.username;
  db.retrieve(username)
    .then(data => res.send(data));
});

app.get('/recipes', (req, res) => {
  //localhost:3000/recipes?ingredients=apples,flour,butter
  var ingredients = req.query.ingredients;
  if(ingredients) {
    spoonacularHelpers.getRecipesByIngredients(ingredients)
      .then(data => res.send(data.data));
  } else {
    res.status(400).send({
       message: 'Pick Some Ingredients Please'
    });
  }
});

app.get('/recipe/:id', (req, res) => {
  //localhost:3000/recipe/615374
  var recipeID = req.params.id;
  debugger;
  spoonacularHelpers.getIngredients(recipeID)
    .then(data => res.send(data));
});

app.post('/sendText', bodyParser.json(), (req, res) => {
  //localhost:3000/sendText  body{number: '13017413473'}
  var phoneNumber = req.body.number;
  var ingredients = req.body.ingredients;
  twilioHelpers.sendMessage(phoneNumber, ingredients)
    .then(res.send('message sent'));
});



app.listen(process.env.PORT || 3000, () => console.log('Food-Matrix listening on port 3000!'))

module.exports = app;