var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var cors = require('cors')

var path = require('path');
const events = require('./events');
// for testing, replace with a config with a valid path, try not to copy paste directly
var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();
const port = process.env.PORT || 3000;

const app = express()
    .use(session({
        secret: process.env.session_key || 'secret',
        resave: false,
        saveUninitialized: false
    }))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(events(connection))
    .use(express.static(path.join(__dirname,"recipe-app/dist/recipe-app/")))
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});