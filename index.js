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

/*

POST -- Request body:

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

app.post('/recipes', (req, res) => {
  var body = req.body;
  var id;
  knex.insert({ name: body.name }).returning('id').into('recipes')
  .then(newid => {
    id = newid[0];

    knex.debug().insert('recipes_id', id),
        steps: step
      }).into('steps').then();
    // return Promise.all(body.steps.map(step => {
    //   knex.debug().insert({
    //     recipes_id: id,
    //     steps: step
    //   }).into('steps').then();
    }));

  })
  .then(results => {

    return knex.select('*').from('tags');

  })
  .then(tags => {

    tags = tags.map(tag => tag.tags);

    return Promise.all(body.tags.map(tag => {
      if (tags.indexOf(tag) === -1) {
        knex.insert({ tags: tag }).into('tags').then();
      }
    }));
  })
  .then(() => {
    return knex.select('*').from('tags').whereIn('tags', body.tags);
  })
  .then(tags => {
    console.log(tags);
    // insert into recipes-tags:
    // recipes_id = id
    // tags_id = each of the body.tags id's
    // (59, 11)
    // (59, 13)
  })
  .catch(err => {
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
