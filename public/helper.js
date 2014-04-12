$.getJSON('/scrape', function(data){ // gets the JSON info
  // console.log(data);
  for(var i = 0; i<2;i++){
    $("<p><b>" + data[i]".</b></p>").appendTo("#helper")
  }
});
$( document ).ready(function() {
  // console.log( "ready!" );
  // $("b").mouseover(function(){
  //  $("<p>" + data[i].rank + "</p>")
  // });

});
