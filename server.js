//Modules & set up =========================================================
var express      = require('express');
var app          = express();
var port         = process.env.PORT || 1337;
var morgan       = require('morgan');
var session      = require('express-session');
var bodyParser   = require('body-parser');
var db     = require('./db');

//app middlewares
//only show logs with arent testing


if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(express.static(__dirname + "/public"));

// set the view engine to ejs
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//TODO(Hudo): Check all config options for session in the docs.
app.use(session({
    secret: "asdasd",
    resave: false,
    saveUninitialized: true
}));

//Routes =========================================================
require('./routes')(app)

//Server =========================================================
app.listen(port, function() {
    console.log('Listenning on port: ' + port);
});
