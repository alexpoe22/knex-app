/* table structure
Table: recipes
Columns: id (primary key), name
Table: steps
Columns: id (primary key), recipes_id (foreign key), instruction
Relationship(s): recipe table one-to-many
-- for each step on a dish, add a new row with the same dish ID
Table: tags
Columns: id, name
Table: recipe_tags
Columns: recipe_id, tag_id
*/
-- DROP TABLE IF EXISTS recipes, steps, tags, recipe-tags;
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS steps (
    id SERIAL PRIMARY KEY,
    recipes_id INTEGER REFERENCES recipes,
    steps TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    tags TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS recipe_tags (
    recipes_id INTEGER REFERENCES recipes,
    tags_id INTEGER REFERENCES tags,
    PRIMARY KEY (recipes_id, tags_id)
);
