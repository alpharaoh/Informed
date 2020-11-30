createPanel();

function sendRequest(expression) { //List. Request and return streamers live in a list    
    $.getJSON({
        type: 'GET',
        url: `https://api.twitch.tv/helix/search/channels?query=${expression}`,
        headers: {
            "client-id" : "1cvh6l3d4n0wp5fr5a2ebamgq491vf",
            "Authorization" : "Bearer rwwg90ejiujx2syyrfex7izp11fpsy"
        }
    }).done(function(response) { 
        $.each(response.data, function(key, streamer){
            if (isLive(streamer)) { //Add 'live' text only to streamers that are live
                $("#result").append('<li class="list-group-item"><img src="'+ streamer.thumbnail_url + 
                    `" class="img-thumbnail"/><span class="streamer_display_name" value="${streamer.id}">` + 
                    streamer.display_name + '</span><div class="icon_live"><span id="live_streaming_icon">live</span></div></li>');
            } else {
                $("#result").append('<li class="list-group-item"><img src="'+ streamer.thumbnail_url + 
                    `" class="img-thumbnail"/><span class="streamer_display_name" value="${streamer.id}">` + 
                    streamer.display_name + '</span></li>');
            }
        });
    });
}

function isLive(streamer) {
    if (streamer.is_live == true) {
        return true;
    }
}

function createPanel() {
    $("#result").css('opacity','0') && $("#result").css('visibility','hidden');
    $(document).ready(function() {
        $("#search_for_streamers").keyup(function() {
            $("#result").html("");
            $("#result").css('opacity','1') && $("#result").css('visibility','visible');;
            let searchField = $("#search_for_streamers").val();
            let query = new RegExp(searchField).toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''); //validation;

            if (query !== "") {
                sendRequest(query);
            } else {
                $("#result").css('opacity','0') && $("#result").css('visibility','hidden');
            }
        });
    });
}