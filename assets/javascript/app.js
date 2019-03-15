//generate buttons
var gifArray = ["Haddaway", "Dumb and Dumber", "Aliens", "Predator"];

function renderGifButtons() {


    $(".button-container").empty();

    gifArray.forEach(function (item, index, gifArray) {
        var gifButton = $(`<div class="gifButton" data-name="${item}" >${item}</div>`);
        $(".button-container").append(gifButton);
    });

}

renderGifButtons();

//AJAX Generate Buttons

$(document).on("click", ".gifButton", function () {

    var getGIF = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + getGIF + "&api_key=iLP3243AHYBYTmM7oSFCZdqHq09UxLyJ&limit=5"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        for (var i = 0; i < response.data.length; i++) {
            console.log("data");
            //Retrieve data
            var gif = response.data[i];
            var gifAnimate = gif.images.fixed_height.url;
            var gifStill = gif.images.fixed_height_still.url;
            var gifInfoRating = gif.rating; 
            var gifInfoTitle = gif.title;

            //initialize variables
            var gifStyler = $(`<div class="gif-styler"></div>`);
            var gifText =  $(`<div class="gif-text"></div>`)
            var gifInfoTitleElement = $(`<p id="title">${gifInfoTitle}</p>`); 
            var gifInfoRatingElement = $(`<p id="rating">Rating: ${gifInfoRating}</p>`); 
            var downloadGif = $(`<a href="${gifAnimate}" class="download-gif" download><img src="#" id="download"> Gif Download</a>`)
            //make gif
            var makeGif = $(`<img class="gif" src="${gifStill}" data-still="${gifStill}" data-animate="${gifAnimate}" data-state="still" alt="${getGIF}">`);

            //concatenate text
            gifText.append(gifInfoTitleElement);
            gifText.append(gifInfoRatingElement);
            gifText.append(downloadGif);

            //append two main elements to gif styler
            gifStyler.append(gifText);
            gifStyler.append(makeGif);
           

            $(".gif-container-flex").prepend(gifStyler);

        }
    });

});

// On Click Gif Pause or Play

$(document).on("click",".gif",function () {

    var state = $(this).attr("data-state");

    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    
    if (state === "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//Enter Button 

$(document).on("click", "#buttonSearch", function (event){

    event.preventDefault();

    var searchInput = $("#searchInput").val();
    gifArray.push(searchInput);
    console.log(gifArray);
    renderGifButtons();
    
});