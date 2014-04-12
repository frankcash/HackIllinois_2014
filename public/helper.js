$.getJSON('/scrape', function(data){ // gets the JSON info
  console.log(data);
  for(var i = 0; i<data.length;i++){ // checks to see how many objects in the JSON
    $("<p><b>" + data[i].price + "</b></p>").appendTo("#helper")
  }
});
$( document ).ready(function() {


});
