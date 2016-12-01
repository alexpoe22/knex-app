var express = require('express');
var bodyParser = require('body-parser');
var knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'knex-app'
    },
});
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

// knex.insert({
//     name: 'Khichidi Kadhi',
//     description: 'Rice and lentils with a yoghurt gravy'
// }).into('recipes').then();


app.post('/recipes', (req, res) => {
    var body = req.body;
    knex.insert({
        name: body.name
    }).returning('id').into('recipes')
    .then((id) =>{
        return Promise.all(body.steps.map(step => {
           knex.insert({
            recipes_id: id.toString(),
            steps: step
        }).into('steps').then(); 
        }));
    })
    .then(results => {

    }).catch(err => {
        console.error(err, 'this is catch');
    });
    

    
    /* insert new recipe & get id number back
       insert steps with reference to recipe id
       insert tags to tags table
          if (tag !exsists then add)
          else(dont)
       insert recipe id and tag id into recipe-tags 
       
    */
    res.status(200).json({message: 'it works'})  
})


app.get('/recipes', (req, res) => {

})


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
