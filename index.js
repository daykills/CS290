const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({defaultLayout:'main'});
const ip = "127.0.0.1"
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

/*When the user visits the ladder subpage, the site automatically
fetches live player ranking data from Path of Exile's API and outputs
the rank, name, level, class, and online status info to the ladder
handlebar*/
app.get('/contacts', function(req, res){

  var ladder_list = []
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var request = new XMLHttpRequest();
  
  request.open("GET", "http://api.pathofexile.com/ladders/Standard?offset=0&limit=200", false);
  request.send(null);

  let data = JSON.parse(request.responseText);

  var queryList = []
  for (var i=0; i<199; i++){
    queryList[queryList.length] = {'rank': i, 'name': data.entries[i].character.name, 
    'level': data.entries[i].character.level, 'class': data.entries[i].character.class, 
    'online': data.entries[i].online};
  }
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
    console.log(`Express started on http://${ip}:${app.get('port')}`);
  });

