function pushNowPlaying(data) {
  console.log(data);
  chrome.runtime.sendMessage("hnhjaebhalmancjhbiekecemgllhaecj", data, (response) => {});
}

function findNowPlaying() {
  var trackNameEl = null;
  var trackArtistEl = null;

  function loop() {
    playerIframe = document.getElementById("app-player");
    if (playerIframe) {
      playerFrameDoc = playerIframe.contentWindow.document;
      trackNameEl = playerFrameDoc.querySelector("#track-name a");
      trackArtistEl = playerFrameDoc.querySelector("#track-artist a");
    }

    if (trackNameEl && trackArtistEl) {
      var trackID = trackNameEl.href.split('/track/')[1];
      pushNowPlaying({
        name: trackNameEl.innerText,
        artist: trackArtistEl.innerText,
	trackID: trackID
      });
    }
  }

  setInterval(loop, 5000);
}

function logger(message) {
  console.log("SpotifyScraper: " + message);
}

findNowPlaying();
