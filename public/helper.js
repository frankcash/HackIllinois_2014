$.getJSON('/scrape', function(data){ // gets the JSON info
  console.log(data);
  for(var i = 0; i<5;i++){
    $("<p><b>" + data[i].price + ".</b></p>").appendTo("#helper")
  }
});
$( document ).ready(function() {


});
