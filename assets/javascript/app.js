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

            var makeGif = $(`<img class="gif" src="${gifStill}" data-still="${gifStill}" data-animate="${gifAnimate}" data-state="still" alt="${gifButtonGet}">`);
            $(".gif-container-flex").append(makeGif);
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