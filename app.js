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
var fs = require("fs");

// // checks to see if the SQLite file exists
// var file = "test.db";
// var exists = fs.existsSync(file);
// 
// // connects to database
// var sqlite3 = require("sqlite3").verbose();
// var db = new sqlite3.Database(file);

// starts server
var app = express();


function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib());
}


function callBackForBitcoin(callback){
	request('http://bitcoincharts.com/', function(error, response, html){
	  if(!error && response.statusCode == 200){
			var metadataArray = [ ]; // array
	    var $ = cheerio.load(html); // puts the html in the parser
	    $('td.right').each(function(i, elements){ // sets the starting element
	    	var a=$(this);
	    	var priceString = a.text();
				var price = "";

				var problemCase = priceString.indexOf("%")
				if(problemCase==7){ // gets rid of precent sign
					var trueString = priceString.substring(0, problemCase);
				}else{ // if there is no percent sign in the number
					var trueString = priceString;
				}

				if(trueString.length > 2){
					price = Number(trueString);
				}else if (trueString.length < 2){
					price = 0.0;
				}

				var metadata = { // creates a new object
						price:price
				};
	    metadataArray.push(metadata);

	    });
			callback(metadataArray);
			// callback(metadataArray);
	  } // end of if statement
	}); // end of function
}

app.get('/bitcoin', function(req,res) { // pushes the info to a sub url
  callBackForBitcoin(function(data){ // call back to the function
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
