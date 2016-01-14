window.onload = function() {
	SC.initialize({
		client_id: '048fd098861b5d45aabb3862e9e81832'
	})
}

function playMusic(genre) {
	console.log(genre);
	SC.get('/tracks',
				 {genres: genre},
				 function(tracks){
		console.log(tracks);
		var random = Math.floor(Math.random() * tracks.length);
		SC.oEmbed(tracks[random].uri, {auto_play: true}, document.getElementById('soundResult'));
	});
}