const window_url = window.location.href;

function getEpisodeIdFromSeasonEpisode(seasonNumber, episodeNumber) {
	const json = window['show_storage'];
	
	if (json && json.seasons) {
    	const foundEpisode = json.seasons.find(episode => episode.season === seasonNumber && episode.episode === episodeNumber);
    	return foundEpisode ? foundEpisode.id_episode : null;
  	} else {
   		return null;
  	}
}

function movie() {
	const json = window['movie_storage'];
	const baseUrl = 'https://www.lookmovie2.to/api/v1/security/movie-access';
	const idMovie = json.id_movie;
	const hash = json.hash;
	const expires = json.expires;
	const url = `${baseUrl}?id_movie=${idMovie}&hash=${hash}&expires=${expires}`;
	window.open(url, '_blank');
}

function show() {
	const json = window['show_storage'];
	const regex = /#S(\d+)-E(\d+)-/i;
	const match = window_url.match(regex);
	
	if (match && match.length >= 3) {
	  const seasonNumber = match[1];
	  const episodeNumber = match[2];
	  const episodeId = getEpisodeIdFromSeasonEpisode(seasonNumber, episodeNumber);
	  if (episodeId !== null) {
	    console.log(`The corresponding episode ID for s${seasonNumber}-e${episodeNumber} is: ${episodeId}`);
		const baseUrl = 'https://www.lookmovie2.to/api/v1/security/episode-access';
		const hash = json.hash;
		const expires = json.expires;
		
		const url = `${baseUrl}?id_episode=${episodeId}&hash=${hash}&expires=${expires}`;
		window.open(url, '_blank');
	  } else {
	    console.log(`Episode ID not found for s${seasonNumber}-e${episodeNumber}`);
	  }
	} else {
	  console.log('Pattern not found in the URL.');
	}
}

const div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "20px";
div.style.right = "20px";
div.style.borderRadius = "15px";
div.style.width = "50px";
div.style.height = "50px";
div.style.display = "flex";
div.style.justifyContent = "center";
div.style.alignItems = "center";
div.style.cursor = "pointer";
div.style.zIndex = "9999999";

const img = document.createElement("img");
img.src = "https://raw.githubusercontent.com/aghyy/amdb_extension/main/amdb.png";
img.style.width = "50px";
img.style.height = "50px";
img.style.borderRadius = "15px";

div.appendChild(img);

div.addEventListener("mouseenter", function() {
  div.style.opacity = 0.5;
});

div.addEventListener("mouseleave", function() {
  div.style.opacity = 1;
});

div.addEventListener("click", function() {
	if (window_url.includes('/shows/')) {
		show();
	} else if (window_url.includes('/movies/')) {
		movie();
	} else {
		console.log('URL is wrong.');
	}
});

document.body.appendChild(div);
