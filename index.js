var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

/* table structure

Table: recipes
Columns: id (primary key), name

Table: steps
Columns: id (primary key), recipes_id (foreign key), instruction
Relationship(s): recipe table one-to-many
-- for each step on a dish, add a new row with the same dish ID

Table: tags
Columns: id, name

Table: recipe-tags
Columns: recipe_id, tag_id
*/


/* pseudo code for endpoints

POST
 - accept name of recipe
 - accept steps of the recipe -- stored in an array
 - accept tags on recipe -- stored in an array

 {
     "name": "Khichidi Kadhi",
     "steps": [
         "Cook rice and lentils",
         "Thicken yogurt with gram flour, cooking over a low heat",
         "Add tadka to yogurt"
     ],
     "tags": ["curry", "vegetarian"]
 }
 */


/*
GET
 - combining multiple tables and put in JSON and return it in res (response)
 - format of the query?
 - /recipes/:id they need to specify an ID # to get info on that recipe

 - return list of recipes and all their associated info in a JSON like:
 [
     {
         "name": "Khichidi Kadhi",
         "steps": [
             "Cook rice and lentils",
             "Thicken yogurt with gram flour, cooking over a low heat",
             "Add tadka to yogurt"
         ],
         "tags": ["curry", "vegetarian"]
     }
 ]
*/


listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' +
  (listener.address().port || 8080));
});
// exports.app = app;
