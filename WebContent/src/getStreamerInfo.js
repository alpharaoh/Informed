$(document).on("click", "#result li", function(event) {
	$(".loader").css("visibility","visible");
    let id = $(this).html().split(" ")[4].split('"')[1]; //get id
    $("#streamer_id").val(id);

    displayStreamerCard(id);
    
});

$(document).on("click", "#close_streamer_card", function(event) {
    $(".card").css('visibility','hidden') && $(".verified").css('visibility','hidden');
});

function displayStreamerCard(id) {
    $.getJSON({
        type: 'GET',
        url: `https://api.twitch.tv/helix/users?id=${id}`,
        headers: {
            "client-id" : "1cvh6l3d4n0wp5fr5a2ebamgq491vf",
            "Authorization" : "Bearer rwwg90ejiujx2syyrfex7izp11fpsy"
        }
    }).done(function(response) { 
    	$(".loader").css("visibility","hidden");
   
        $(document).ready(function() {
            $.getJSON({
                type: 'GET',
                url: `https://api.twitch.tv/helix/channels?broadcaster_id=${response.data[0].id}`,
                headers: {
                    "client-id" : "1cvh6l3d4n0wp5fr5a2ebamgq491vf",
                    "Authorization" : "Bearer rwwg90ejiujx2syyrfex7izp11fpsy"
                }
            }).done(function(responseForGame) { 
                document.getElementsByName("last_game_category")[0].innerHTML = "Last Category: " + responseForGame.data[0].game_name;
            });
            $("#email_input").val(""); //empty email input
            document.getElementById("streamer_card_left_image").src = response.data[0].profile_image_url; //change picture
            document.getElementById("streamer_viewer_count").innerHTML = viewsWithCommas(response.data[0].view_count) + " views";
            document.getElementById("streamer_bio").innerHTML = checkDesciption(response.data[0].description); 
            document.getElementById("streamer_card_title").innerHTML = response.data[0].display_name; 
            document.getElementsByName("streamer_stats")[0].href = `https://twitchtracker.com/${response.data[0].login}`;
            document.getElementsByName("most_popular_clips_link")[0].href = `https://www.twitch.tv/${response.data[0].login}/clips?filter=clips&range=all`;
            document.getElementsByName("watch")[0].href = `${window.location.protocol}//${window.location.host}/watch.html?=${response.data[0].login}`;

            if (response.data[0].broadcaster_type === "partner") {
                $(".verified").css('visibility','visible');
            } else {
                $(".verified").css('visibility','hidden');
            }

            let streamerList = getCookie('streamers').split("-").filter(n => n);

            if (streamerList.length !== 0) {
                try {
                    let toggle = false

                    streamerList.forEach(streamerId => {
                        if (streamerId === id) {
                            toggle = true;
                        }
                    });
                
                    if (toggle) {
                        $('#toggle-trigger').bootstrapToggle('on');
                    } else {
                        $('#toggle-trigger').bootstrapToggle('off');
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            $(".main-block").css("visibility","hidden") && $("#result").css('opacity','0') && $("#result").css('visibility','hidden') && $(".card").css('visibility','visible');
            
        });
    });
}

function viewsWithCommas(views) {
    return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function checkDesciption(description) {
    if (description === "") {
        return "This streamer has no description";
    } else {
        return description;
    }
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Return null if not found
    return null;
}