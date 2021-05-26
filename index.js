const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('port', 9977);
app.use(express.static("public"));

// various routes to render the different webpages
app.get('/', function(req, res){
	res.render('home')
});

app.get('/food', function(req, res){
	res.render('food')
});

app.get('/register', function(req, res){
  res.render('register')
});

app.get('/travel', function(req, res){
  res.render('travel')
});

  var resObj = {queryObj: queryList};
  res.render('contacts', resObj);
});


// handle 404 responses
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// handle 500 responses
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
    console.log(`Express started on http://${process.env.HOSTNAME}:${app.get('port')}`);
  });

