/*
curl -i -s -k -X $'POST' -H $'Host: id.twitch.tv' -H $'Connection: close' $'https://id.twitch.tv/oauth2/token?client_id=81ba6h15w25fx6l4hb99hbruivc7f2&client_secret=2zwjhyz4cds1ooz38zkajrd2stdxlh&grant_type=client_credentials'
*/

//let streamers = ["22484632","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","71092938","91","92","93","94","95","96","97","98","99"];
let streamers = ["71092938","43691", "22484632"]; //xqcow, faker, 
display(streamers);

function display(streamers) { //doesnt work.
    let currentStreamersLive = getStreamersLive(streamers);
    
    let text = "";
    
    currentStreamersLive.forEach(live => {
        text += (live.user_name + "<br>");
    });
    
    console.log(currentStreamersLive);
    console.log(currentStreamersLive.length);
    
    document.getElementById("streamers_live").innerHTML = text;
}

function sendRequest(streamersLive, url) { //List. Request and return streamers live in a list
    $.ajax({
        type: 'GET',
        url: url,
        headers: {
            "client-id" : "1cvh6l3d4n0wp5fr5a2ebamgq491vf",
            "Authorization" : "Bearer rwwg90ejiujx2syyrfex7izp11fpsy"
        }
    }).done(function(response) { 
        response.data.forEach(streamer => {
            streamersLive.push(streamer);
        });

        return streamersLive;
    });
}

function createUrl(list_of_streamers) {
    const param = "&user_id=";
    let url = "https://api.twitch.tv/helix/streams?";

    list_of_streamers.forEach(streamer => {
        url += (param + streamer);
    });

    return url;
}

function splitStreamers(streamersArray, maxLengthPerQuery) { //This will split the list so there are at most 100 elements per list
    let chunks = [], i = 0, n = streamersArray.length; 
    while (i < n) {
      chunks.push(streamersArray.slice(i, i += maxLengthPerQuery));
    }
    return chunks;
}

function getStreamersLive(inputStreamers) { //and validate
    const chunkSize = 100;
    let streamersLive = [];

    if (inputStreamers.length >= 100) { //twitch api only allows 100 user_id query per api request
        let streamersList = splitStreamers(inputStreamers, chunkSize);

        streamersList.forEach(streamers => {
            sendRequest(streamersLive, createUrl(streamers));
        });

    } else {
        sendRequest(streamersLive, createUrl(inputStreamers));
    }

    return streamersLive;
}