$(document).ready(function () {
	$('.toggle.android').on('click', function () {
		let streamer = document.getElementById("streamer_id").value;

		if ($('#toggle-trigger').is(':checked')) {
			removeStreamer(streamer);
		} else {
			addStreamer(streamer);
		}
	})
});

function addStreamer(streamerToAdd) {
	$.ajax({
		type: 'GET',
		url: `${window.location.protocol}//${window.location.host}/add?id=${streamerToAdd}`,
		
		}).done(function(response) {
			let JSONresponse = JSON.parse(response);
					
			if (JSONresponse.success === "true" && JSONresponse.comment === "") {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Nice!',
					showConfirmButton: false,       
					text: 'You successfully added the streamer to your account',
					width: 280,
					timer: 1500
				})
				addStreamerToCookie(streamerToAdd);

			} else if (JSONresponse.success === "false" && JSONresponse.comment === "full") {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ah!',
					text: 'Looks like you exceeded your streamers. Max is 3 at a time',
					width: 280
				})
				$('#toggle-trigger').bootstrapToggle('off');
			} else if (JSONresponse.success === "false" && JSONresponse.comment === "authorization error") {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ooops...',
					text: 'Authorization error, are you logged in?',
					width: 280
				})
				$('#toggle-trigger').bootstrapToggle('off');
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Hmm...',
					text: 'Looks like there was an error on our side',
					width: 280
				})
				$('#toggle-trigger').bootstrapToggle('off');
			}
	});
}

function removeStreamer(streamerToDelete) {
	$.ajax({
		type: 'GET',
		url: `${window.location.protocol}//${window.location.host}/remove?id=${streamerToDelete}`,
		
		}).done(function(response) {
			let JSONresponse = JSON.parse(response);
				
			if (JSONresponse.success === "true" && JSONresponse.comment === "") {
				Swal.fire({
					position: 'center',
					icon: 'info',
					title: 'Deleted...',
					showConfirmButton: false,       
					text: 'You deleted this streamer from your account',
					width: 280,
					timer: 1500
				})
				deleteStreamerFromCookie(streamerToDelete);
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Hmm...',
					text: 'Looks like there was an error',
					width: 280
				})
			}
	});
}

function addStreamerToCookie(streamer) {
	let streamers = getCookie('streamers').split("-").filter(n => n);

	streamers.push(streamer);

	document.cookie = "streamers=" + buildCookie(streamers);
}

function deleteStreamerFromCookie(streamer) {
	let streamers = getCookie('streamers').split("-").filter(n => n);
	
	let index = streamers.indexOf(streamer);

	if (index > -1) {
		streamers.splice(index, 1);
	}

	document.cookie = "streamers=" + buildCookie(streamers);
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

function buildCookie(list) {
	let text = "";

	list.forEach(element => {
		text += element + "-";
	});

	return text.slice(0, -1);
}