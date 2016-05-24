var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var path =  require("path");
var cons = require('consolidate');
var passport = require('passport');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');


//app.use(favicon());
// app.use(logger('dev'));
app.use(bodyParser.json());
 app.use(bodyParser.urlencoded());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// Configuring Passport

// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport

var mongoose = require('mongoose');
require('./model/user')(mongoose);
require('./model/teacher')(mongoose);

mongoose.connect('mongodb://localhost:27017/collegedb');


var student = require('./controllers/student')(passport);
app.use('/', student);





  
// view engine setup
app.engine('jade', cons.swig);
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');*/
 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
 app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates

app.use(flash());
var routes = require('./routes/index')(passport);
app.use('/', routes);

app.get('/createStudent', function(req,res){
        res.render("createstudent.html" );
});



/*var student= require('./controllers/student');
app.use('/student' , student);
*/
var teachers= require('./controllers/teachers');
app.use('/teachers',teachers);

var course= require('./controllers/course');
app.use('/course',course);

var anounce= require('./controllers/anounce');
app.use('/anounce',anounce);

var fileop=require('./controllers/fileoperations');
app.use('/fileop',fileop);
	

app.listen(8081);
console.log("running at 8081");		