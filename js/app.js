// use strict
// should this be in a document ready function?


// Initialize global variables
var totalListings;

// Once user submits search, clear any previous search results
// Then make ajax call using current search terms
$("#submit").on("click", function(event){
  event.preventDefault();

  // Clear poster images and titles from previous searches
  $("#movies").empty();
  // And clear any existing pagination
  $("#pagination").remove();

  // What happens if title or year is left blank? Display error messages?

  // Get current search terms
  var title = $("#search").val();
  var year = $("#year").val();
  var url = "http://www.omdbapi.com/?";
  pagenumber = 1;
  var data = {
     s: title,
     y: year,
     r: "json",
     page: pagenumber
  }

  // Make ajax call
  $.getJSON(url, data, displayResults);



}); // ends on click


// This function will insert search results into the html
function displayResults(response){
  var html = "";
  // If there is no search data found, show error screen
  if (response.Response == "False") {
     html += "<li class='no-movies'>";
     html += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + $("#search").val() + "</li>";
  // Else, cycle through response data
  } else {
     $.each(response.Search, function(index, movie){

       // If there's no poster available, use placeholder
       if (movie.Poster == "N/A"){
         var poster = "<i class='material-icons poster-placeholder'>crop_original</i>"
       } else {
         poster = "<img class='movie-poster' src=" + movie.Poster + ">";
       }

       // Build html to be appended
       html += "<li>";
       html += "<div class='poster-wrap'>";
       html += poster;
       html += "</div>";
       html += "<span class='movie-title'>" + movie.Title + "</span>";
       html += "<span class='movie-year'>" + movie.Year + "</span>";
       html += "</li>";
     }); // ends each
  }
  // Then append search results to ul
  $("#movies").append(html);


  // Get totalResults value from API, then call pagination function
  var totalListings = response.totalResults;
  console.log("There are " + totalListings + "total listings: " );
  paginate();
} // ends displayResults


/* The API has already paginated the results into groups of 10.
   So, I fixed the CSS to display two rows of five across, because that's tidier

   Next, I will create function paginate(), which will:
   - calculate number of page links needed, and create them
   - when a link is clicked on, set pagenumber variable to the number of that link,
   - then, make a new ajax call with updated pagenumber variable to get that page's results */

function paginate(){

  var pagesNeeded = totalListings/10;
  (console.log pagesNeeded);

  // Append a pagination div
  $("#movies").append("<div id='pagination'><div>");

}
