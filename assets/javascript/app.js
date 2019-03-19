//generate buttons
var gifArray = ["Haddaway", "Dumb and Dumber", "Aliens", "Predator"];
var isWelcome = true;
var favoriteArray = [];
var queryLimit = 5;

//Gif welcome screen 

function welcomeScreen(isWelc) {

    var getWelcomeGif = "welcome";

    var queryWelcomeURL = "https://api.giphy.com/v1/gifs/search?q=" + getWelcomeGif + "&api_key=iLP3243AHYBYTmM7oSFCZdqHq09UxLyJ&limit=" + queryLimit;


    $.ajax({
        url: queryWelcomeURL,
        method: "GET"
    }).then(function (response) {

        var randomWelcome = Math.floor(Math.random() * queryLimit);
        var gifWelcome = response.data[randomWelcome].images.fixed_height.url;

        if (isWelc) {
            var welcome = $(`<div class="place-holder">
        <h6>Click one of the buttons to query the topic or create a query yourself!</h6>
        <img src=${gifWelcome} alt=""></div>`);

            $(".gif-container-flex").append(welcome);
        }

        if ($(".gif-container-flex").find(".place-holder").length !== 0) {

            if (!isWelc) {

                $(".gif-container-flex").empty();

            }
        }

    });
}


function renderGifButtons() {

    $(".button-container").empty();

    gifArray.forEach(function (item, index, gifArray) {
        var gifButton = $(`<div class="gifButton" data-name="${item}" >${item}<span class="x">X</span></div>`);
        $(".button-container").append(gifButton);

    });

}

function favoriteGIf(gif) {

    var favGif = $(`<div  class="favorite-gif">${gif.attr("data-name")}`);

    $("#favoriteList");
}

//AJAX Generate Buttons

$(document).on("click", ".gifButton", function () {

    //Make Welcome screen disappear
    isWelcome = false;
    welcomeScreen(isWelcome);

    var getGIF = $(this).attr("data-name");
 

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getGIF + "&api_key=iLP3243AHYBYTmM7oSFCZdqHq09UxLyJ&limit=" + queryLimit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            //Retrieve data
            var gif = response.data[i];
            var gifAnimate = gif.images.fixed_height.url;
            var gifStill = gif.images.fixed_height_still.url;
            var gifInfoRating = gif.rating;
            var gifInfoTitle = gif.title;

            //initialize variables
            var gifStyler = $(`<div class="gif-styler"></div>`);
            var gifText = $(`<div class="gif-text"></div>`)
            var gifInfoTitleElement = $(`<p id="title">${gifInfoTitle}</p>`);
            var gifInfoRatingElement = $(`<p id="rating">Rating: ${gifInfoRating}</p>`);
            var downloadGif = $(`<a href="${gifAnimate}" class="download-gif" download><img src="./assets/images/down-arrow.svg" id="download" class="bounce"> Gif Download</a>`);

            //make gif
            var makeGif = $(`<img class="gif" src="${gifStill}" data-still="${gifStill}" data-animate="${gifAnimate}" data-state="still" alt="${getGIF}">`);

            //concatenate text
            gifText.append(gifInfoTitleElement);
            gifText.append(gifInfoRatingElement);
            gifText.append(downloadGif);

            //append two main elements to gif styler
            gifStyler.append(gifText);
            gifStyler.append(makeGif);

            //populate gifs
            $(".gif-container-flex").prepend(gifStyler);

        }
    });

});

// On Click Gif Pause or Play

$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

    if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//Enter Button 

$(document).on("click", "#buttonSearch", function (event) {

    event.preventDefault();

    var searchInput = $("#searchInput").val();
     queryLimit = $("#queryLimit").val();

    gifArray.push(searchInput);
    renderGifButtons();

});

// Click the X
$(document).on("click", ".x", function () {

    $(this).parent().remove();

    var index = gifArray.indexOf($(this).parent().attr("data-name"));
    console.log("Click X - index = " + index);

    if (index > -1) {
        gifArray.splice(index, 1);
    }

    renderGifButtons();
});

//Favotite Gif 

$(document).on("click", "#fav-icon", function () {

});

//execute functions
renderGifButtons();
welcomeScreen(isWelcome);