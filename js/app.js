// use strict
// should this be in a document ready function?

var html;
var url = "http://www.omdbapi.com/?";
var encodedtitle;
var title;
var year;
var data;
var poster;

// get results of id="search" (on keyup? or on submit?)
$("#submit").on("click", function(event){
   event.preventDefault();

  // clear poster images and titles from previous searches
   $("#movies").empty();

  // what happens if title or year is left blank? Display error messages?

   // encodedtitle = encodeURIComponent($("#search").val());
   title = $("#search").val();
   year = $("#year").val();
   data = {
      s: title,
      y: year,
      r: "json"
   }

  $.getJSON(url, data, function(response){

    html = "";
    // if there is no search data found, show error screen
    if (response.Response == "False") {
       html += "<li class='no-movies'>";
       html += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + $("#search").val() + "</li>";
    // else, cycle through response data
    } else {
       $.each(response.Search, function(index, movie){

         if (movie.Poster == "N/A"){
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
       }); // ends each
    }

    // append to ul
    $("#movies").append(html);


}); // ends getJSON call


}); // ends on click
