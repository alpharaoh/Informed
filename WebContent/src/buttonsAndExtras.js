//Make sure to have logout if there is cookies (login)
//Not best solution, but easiest
$(document).ready(function () {
	

    if (document.cookie === "") {
        $(".login_regis_header").css("visibility","visible");
        $(".logout_header").css("visibility","hidden");
    } else {
        $(".login_regis_header").css("visibility","hidden");
        $(".logout_header").css("visibility","visible");
    }
});



$(".login_regis_header").css("visibility","hidden")
$(".logout").css("visibility","visible")

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

$("#streamer_search").mouseover( function () {
    $(".header_title").css("opacity","0");
    $(".container_streamer_search").css("opacity","1");
});

$("#streamer_search").mouseout( function () {
    $(".header_title").css("opacity","1");
    $(".container_streamer_search").css("opacity","0");
});

$(".list-group").mouseover( function () {
    $(".header_title").css("opacity","0");
    $(".container_streamer_search").css("opacity","1");
});

$(".list-group").mouseout( function () {
    $(".header_title").css("opacity","1");
    $(".container_streamer_search").css("opacity","0");
    
});

$("form :input").attr("autocomplete", "off");

$("#login").click( function () {
    $(".login-main-block").css("visibility","visible");
    $("#stay_").css("visibility","hidden");
    $(".informed_text_register").css("visibility","hidden");
    $(".main-block").css("visibility","hidden");
});

$("#logout").click( function () {
    window.location.replace(`${window.location.protocol}//${window.location.host}/logout`)
});

$("#close_registration").click( function () {
    $(".main-block").css("visibility","hidden");
    $("#stay_").css("visibility","hidden");
    $(".informed_text_register").css("visibility","hidden");
});

$("#close_login").click( function () {
    $(".login-main-block").css("visibility","hidden");
});

$("#register").click( function () {
    if ($(".main-block").css('visibility') !== "visible") {
        $(".main-block").css("visibility","visible");
        $(".card").css("visibility","hidden");
        $(".verified").css("visibility","hidden");
        $(".login-main-block").css("visibility","hidden");
    
        if ($("#clicked_reg").val() !== "true") {
            $("#clicked_reg").val(true);
            
            setTimeout(
                function() 
                {
                    $("#stay_").toggleClass('start');
                }, 3000);

            setTimeout(
                function() 
                {
                    $(".informed_text_register").css("visibility", "visible")

                }, 4500);

            setTimeout(
                function() 
                {
                    $('#hide_blur_overflow').toggleClass('start');
                    $('#deku_image').toggleClass('start');
                }, 1500);
        } else {
            $(".informed_text_register").css("visibility", "visible")
            $("#stay_").css("visibility", "visible")
        }
    } 
});


