$.getJSON('/scrape', function(data){ // gets the JSON info
  console.log(data);
  for(var i = 0; i<1;i++){
    $("<p><b>" + data + ".</b></p>").appendTo("#helper")
  }
});
$( document ).ready(function() {


});
