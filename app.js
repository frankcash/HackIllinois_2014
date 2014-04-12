// scrapes info from http://bitcoincharts.com/
// need to find a way to "responsibly" update prices without restarting server
// doge coin:  http://dogepay.com
// litecoin: www.ltc-charts.com
// need to find standarized prices of dogecoin, litcoin, etc

var request = require('request');
var cheerio = require('cheerio');
var express = require('express')
  , stylus = require('stylus')
    , nib = require('nib')

var app = express(); // starts server


function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib());
}


function callBackForJSON(callback){
	request('http://bitcoincharts.com/', function(error, response, html){
	  if(!error && response.statusCode == 200){
			var metadataArray = [ ]; // array
	    var $ = cheerio.load(html); // puts the html in the parser
	    $('td.right').each(function(i, elements){ // sets the starting element
	    	var a=$(this);
	    	var priceString = a.text();
				var test = Number(priceString);
				var metadata = { // creates a new object
						price:test
				};
	    metadataArray.push(metadata);

	    });
			callback(metadataArray);
			// callback(metadataArray);
	  } // end of if statement
	}); // end of function
}

app.get('/scrape', function(req,res) { // pushes the info to a sub url
  callBackForJSON(function(data){ // call back to the function
    res.send(data);
  });
})

metadataArray = [ ]; // clears the array

app.set('views', __dirname + '/views') // sets dir

app.set('view engine', 'jade') // tells express to use jade

app.use(express.logger('dev'))

app.use(stylus.middleware(
			  { src: __dirname + '/public'
				  , compile: compile
				  }
			))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) { //get index and renders it
  res.render('index',
		  { title : 'Home' }
			  )
})

app.listen(3000)
