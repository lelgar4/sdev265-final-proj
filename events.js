const express = require('express');
const async = require('async');
var bcrypt = require('bcrypt');
var session = require('express-session');
var path = require('path');
const request = require('express/lib/request');


// TODO: Get user information as a get route

function createRouter(db) {
    const router = express.Router();

    router.get('/', (request, response) => {
        console.log(request)
        response.sendFile(path.join(__dirname, "recipe-app/dist/recipe-app/index.html"));
    })

    router.get('/userRecipe', (request, response) => {
        db.query('select * from recipes where user_id = ?', [request.session.user_id], function (error, results) {

            if (!error) {
                response.status(200).json({ status: 'ok', recipes: results });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    })
    router.get('/userChecklist', (request, response) => {
        db.query('select * from checklist where user_id = ?', [request.session.user_id], function (error, results) {
            if (!error) {
                response.status(200).json({ status: 'ok', checklist: results });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    })

    router.post('/recipeItems', (request, response) => {
        var recipeId = request.body.recipeId;
        db.query('select * from recipe_items where recipe_id = ?', [recipeId], function (error, results) {
            if (!error) {
                response.status(200).json({ status: 'ok', steps: results });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    })

    router.post('/recipeItem', (request, response) => {
        var meas = request.body.measurement;
        var ing = request.body.ingredient;
        var preparation = request.body.preparation;
        var recipeId = request.body.recipeId;
        console.log(request.session)
        db.query('INSERT INTO recipe_items (ingredient,measurement,preparation,recipe_id) VALUES (?,?,?,?)', [ing,meas,preparation,recipeId], function (error, result) {
            console.log(result)
            if (!error) {
                response.status(200).json({ status: 'ok', itemId: result.insertId });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    })
    router.put('/recipeItem', (request, response) => {
        var meas = request.body.measurement;
        var ing = request.body.ingredient;
        var preparation = request.body.preparation
        var itemId = request.body.itemId
        db.query('UPDATE recipe_items SET ingredient = ? , measurement = ? , preparation = ? WHERE recipeItem_id = ?', [ing,meas,preparation,itemId], function (error, result) {
            if (!error) {
                response.status(200).json({ status: 'ok' });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    })
    router.put('/updateRecipe', (request, response) => {
        var ins = request.body.instructions;
        var itemLength = request.body.itemLength;
        var recipeId = request.body.recipeId;
        db.query('UPDATE recipes SET ingredient_length = ? , instructions = ? WHERE recipe_id = ?', [itemLength,ins,recipeId], function (error, result) {
            if (!error) {
                response.status(200).json({ status: 'ok',item:result });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    })

    // posts

    router.post('/register', function (request, response, next) {
        var username = request.body.username;
        var password = request.body.password;
        var email = request.body.email;
        bcrypt.hash(password, 12, function (err, hash) {
            db.query('INSERT INTO users (username,password,email) VALUES (?,?,?)', [username, hash, email], function (error, results) {
                if (!error) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    request.session.id = results.user_id;
                    response.status(200).json({ status: 'ok', user: request.session.username });
                } else {
                    response.status(401).json({ status: 'error' });
                }
                response.end();
            });

        });
    });

    // TODO: Add user id to recipes and checklists
    router.post('/addRecipe', function (request, response, next) {
        var name = request.body.name;
        var desc = request.body.description;
        console.log(request.session)
        console.log(name, desc, request.session.user_id)
        db.query('INSERT INTO recipes (name,description,user_id) VALUES (?,?,?)', [name, desc, request.session.user_id], function (error, result) {
            if (!error) {
                response.status(200).json({ status: 'ok', recipeId:result.insertId  });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    });
    
    router.post('/addChecklist', function (request, response, next) {
        var name = request.body.name;
        var desc = request.body.description;
        db.query('INSERT INTO recipes (name,desc,user_id) VALUES (?,?,?)', [name, desc, request.session.user_id], function (error, results) {
            if (!error) {
                response.status(200).json({ status: 'ok', });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    });



    // TODO: make sure to get correct recipe/checklist ID.
    router.post('/addRecipeItem', function (request, response, next) {
        var ing = request.body.ingredient;
        var meas = request.body.measurement;
        var prep = request.body.preparation;

        db.query('INSERT INTO recipe_items (ingredient,measurement,preparation,recipe_id) VALUES (?,?,?,?)', [ing, meas, prep, ''], function (error, results) {
            if (!error) {
                response.status(200).json({ status: 'ok', });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    });
    router.post('/addChecklistItem', function (request, response, next) {
        var ing = request.body.ingredient;
        var meas = request.body.measurement;
        var prep = request.body.preparation;

        db.query('INSERT INTO recipe_items (ingredient,measurement,preparation,recipe_id) VALUES (?,?,?,?)', [ing, meas, prep, ''], function (error, results) {
            if (!error) {
                response.status(200).json({ status: 'ok', });
            } else {
                response.status(401).json({ status: 'error' });
            }
            response.end();
        });
    });



    router.post('/auth', function (request, response, next) {
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
            db.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password).then((result) => {
                        if (result){
                            request.session.loggedin = true;
                            request.session.username = username;
                            request.session.user_id = results[0].user_id;
                            request.session.save((e) => {
                            })
                            response.status(200).json({ status: 'ok', user: request.session.username, id: results[0].id });
                        } else{
                            response.status(401).json({ status: 'incorrect username/password' })
                            // response.send('incorrect username/password');
                        }

                    }).catch(err => {
                        response.status(401).json({ status: 'error' })
                        // response.send('An unexpected error happened');
                    });
                }
            });

        } else {
            response.status(401).json({ status: 'error' })
            // response.end();
        }
    });

    return router;
}

module.exports = createRouter;