var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('bodyparser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host     : '62.210.130.145',
        //host     : 'localhost',
        user     : 'projetI',
        //user       : 'root',
        password : 'Integration7',
        //password   : '',
        database : 'NeedHelpV2'
        //database : 'needhelp'
    });
    res.locals.connection.connect(function(error){
        if(error){
            //res.render('error', {message:"Impossible de se connecter à la base de données"});
        }
        else {
            //res.locals.connection.connect();
            next();
        }
    });
});

app.use( bodyParser.json() )
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(cors())
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
