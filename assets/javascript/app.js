$(document).ready(function() {
// Initial Array of Super Heroes
    var heroes = ["Wolverine", "Batman", "Iron Man", "SuperMan"];
    

    function renderButtons() {
        // Deleting the heroes prior to adding new heroes
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < heroes.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var newHero = $("<button>");
          // Adding a class of hero to our button
          
          newHero.addClass("btn-primary");
          // Adding a data-attribute
          newHero.attr("data-name", heroes[i]);
          // Providing the initial button text
          newHero.text(heroes[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(newHero);
        }
      }  
        // This function pushes a new hero entered into the textbox into the existing array.
      $("#add-hero").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var hero = $("#hero-input").val().trim();
        // Adding hero from the textbox to our array
        heroes.push(hero);
       
        // Calling renderButtons which handles the processing of our hero array
        renderButtons();
        fetchPictures ();
     });
      // Adding a click event listener to all elements with a class of "hero"
      // $(document).on("click", ".hero", displayHeroInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      function fetchPictures () {
      $("button").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      $("#hero-view").empty();
      var person = $(this).attr("data-name");
      console.log(person);
      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          console.log(response);
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");
              // Storing the result item's rating
              var rating = results[i].rating;
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);
              // Creating an image tag
              var personImage = $("<img>");
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);
              personImage.addClass("images");
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#hero-view").append(gifDiv);
          }
      	}
     });
     });
  }

  fetchPictures ();
});

