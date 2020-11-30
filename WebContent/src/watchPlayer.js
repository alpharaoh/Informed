$(document).ready(function() {
	let streamer = window.location.search.split("=")[1];
	document.title = streamer.toUpperCase().split("").join(" ");

	$("iframe#twitch-embed").height(screen.height);	
	
	var ratioMultiplier = 0.8;
	
	var chat_width = screen.width * (1 - ratioMultiplier)-10;
	var chat_height = screen.height * ratioMultiplier;
	
	let parent = window.location.origin.split("//")[1].split(":")[0];
	
	// var chatSource = `https://www.twitch.tv/embed/${streamer}/chat`
	
	let iframe_player = '<iframe id="twitch-embed" src="https://embed.twitch.tv?autoplay=true&channel=' + streamer + '&layout=video&migration=true&muted=false&parent=' + parent + '"&parents=localhost allowfullscreen="" scrolling="no" frameborder="0" allow="autoplay; fullscreen" title="Twitch" width="100%" height="100%" style="width:100%" sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>'
	
	let iframe_chat = '<iframe id="twitch_chat_embed" src="https://www.twitch.tv/embed/' + streamer + '/chat?&parent=' + parent + '&no-mobile-redirect=true&darkpopout" id="twitch-chat" frameborder="0" width="' + chat_width + '" height="' + chat_height + '"&muted=false style="height: ' + screen.height + 'px" sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>'
	document.getElementById("twitch-embed").innerHTML = iframe_player;
	$(".twitch_player_and_chat").append('<div class="divider" style="position: absolute; width: 50px; flex: 2; height: 100%; left: 80%; opacity: 0.5; transition: opacity 0.2s;"></div>')
	document.getElementById("twitch_chat").innerHTML = iframe_chat;
});

$(function () {
	var p1 = parseInt($("#twitch-embed").css("width"));
	var p2 = parseInt($("#twitch_chat_embed").css("width"));
	var fullWidth= screen.width;
	var initialPos = parseInt($(".divider").css("left"));
	$(".divider").draggable({
		 axis: "x",
		 containment: "parent",
		 scroll: false,
		 drag: function () {
			  var a = parseInt($(this).css("left"));
		 
			  $("iframe#twitch-embed").width(a);
			  console.log(fullWidth, a);
			  $("#twitch_chat_embed").css("width", fullWidth-a);

		 }
	});
});