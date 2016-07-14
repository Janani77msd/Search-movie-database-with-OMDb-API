// use strict
// should this be in a document ready function?

var html;
var url = "http://www.omdbapi.com/?";
var encodedtitle;
var year;
var data;

// get results of id="search" (on keyup? or on submit?)
$("#submit").on("click", function(event){
   console.log("Search submitted")
   event.preventDefault();
// must clear html variable somewhere
// what happens if title or year is left blank? Display error messages?

   encodedtitle = encodeURIComponent($("#search").val());
   year = $("#year").val();
   data = "s=" + encodedtitle + "&y=" + year + "&type=movie" + "&r=json";

  $.getJSON(url, data, function(movie){

    html = "";
    // if there is no search data found (i.e., if (!movie.Title)), show relevant screen
    // else, cycle through response data

       $.each(movie, function(){

         if (!movie.Poster){
           poster = "<i class='material-icons poster-placeholder'>crop_original</i>"
         } else {
           poster = "<img class='movie-poster' src=" + movie.Poster + ">";
         }

         html += "<li>";
         html += "<div class='poster-wrap'>";
         html += poster;
         html += "</div>";
         html += "<span class='movie-title'>" + movie.Title + "</span>";
         html += "<span class='movie-year'>" + movie.Year + "</span>";
         html += "</li>";
         // do I have to return html?
       });

    // append to ul
    $("#movie").append(html);


}); // ends getJSON call


}); // ends on click
