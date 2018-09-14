$(document).ready(function () {

    // Array of initial dances
    let dances = ['Argentine tango', 'swing dance', 'waltz', 'foxtrot', 'cha cha', 'ballet', 'jazz', 'square dance', 'chicken dance', 'happy dance', 'macarena', 'electric slide'];

    //Function: render buttons for initial dances from 'dances' array
    function renderButtons() {
        $('.buttonArea').empty();
        for (let i = 0; i < dances.length; i++) {
            let danceButton = $('<button>');
            danceButton.addClass('btn danceButton');
            danceButton.data('name', dances[i]);
            danceButton.text(dances[i]);
            // Add button to button area
            $('.buttonArea').append(danceButton);
        }
        console.log("Buttons rendered")
    }

    //Function: show and control amimation of .gifs
    function showGif() {
        let name = $(this).data("name");
        console.log('Showing gifs for ' + name);
        let myUrl = 'https://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=Yt6V2WgjwgQMQApBqVERs6SnSUhxtVMg'; 
        // AJAX call for dance button clicked
        $.ajax({
            url: myUrl,
            method: 'GET'
        }).done(
            function (response) {
                console.log('Retrieved .gifs for ' + name);
                let data = response.data;
                //Empty div before adding more gifs
                $('.display').empty();
                // Restrict images by rating (only allow g and pg)
                let row = $("<div class= 'row'>");
                for (let i = 0; i < data.length; i++) {
                    if (data[i].rating !== "r" && data[i].rating !== "pg-13") {
                        let gify = data[i].images.fixed_height.url;
                        let still = data[i].images.fixed_height_still.url;
                        let gifyImg = $('<img class="gify">');
                        gifyImg.attr('src', still);
                        gifyImg.data("animate", gify);
                        gifyImg.data("still", still);
                        gifyImg.data("state", "still");
                        let imgBox = $('<div class = "imgBox col-sm-6">');
                        imgBox.append(gifyImg);
                        if (i % 2 == 0) {
                            row = $("<div class= 'row'>");
                        }
                        row.append(imgBox)
                        $('.display').append(row);
                        // Display ratings for .gifs
                        let rating = data[i].rating;
                        let displayRated = $('<h5>').text("Rating: " + rating);
                        $(imgBox).prepend(displayRated);
                    }
                }
                $('html, body').animate({
                    scrollTop: $(".display").offset().top
                }, 1000);
            }
        );
    }

    //Function: Add new dance button on click
    $('.add').click(function () {
        let name = $('#danceName').val().trim();
        if (name != "") {
            console.log('New button to be added:' + name);
            dances.push(name);
            $('#danceName').val("");
            renderButtons();
            //  WHY WON'T THIS WORK?
            // $("h2").html(name);
            //
        }
    });

    // Function: Change state of animation on click
    function changeState() {
        console.log('Changing my state...');
        let state = $(this).data('state');
        if (state == 'animate') {
            $(this).attr('src', $(this).data('still'));
            $(this).data('state', 'still');
        } else {
            $(this).attr('src', $(this).data('animate'));
            $(this).data('state', 'animate');
        }
    }

    $(document).on("click", ".danceButton", showGif);
    $(document).on("click", ".gify", changeState);

    renderButtons();
});

