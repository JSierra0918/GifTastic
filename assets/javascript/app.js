//generate buttons
var gifArray = ["haddaway", "dumb and dumber", "alien", "predator"];

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

    var gifButtonGet = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifButtonGet + "&api_key=iLP3243AHYBYTmM7oSFCZdqHq09UxLyJ&limit=5"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL);
        console.log(response.data[0].images.fixed_height.url);

        for (var i = 0; i < response.data.length; i++) {
            console.log("data");
            var gif = response.data[i];
            var gifAnimate = gif.images.fixed_height.url;
            var gifStill = gif.images.fixed_height_still.url;

            var makeGif = $(`<img src="${gifStill}" data-still="${gifStill}" data-animate="${gifAnimate}" data-state="still"alt="${gifButtonGet}">`);
            $(".gif-cotainer").append(makeGif);
        }



    });


});