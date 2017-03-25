function pushNowPlaying(name) {
  chrome.runtime.sendMessage("gjkcapoheblcajplncmgpcbpdmccciie", {track: name}, (response) => {});
}

function findNowPlaying() {
  var trackNameEl = null;

  function loop() {
    playerIframe = document.getElementById("app-player");
    if (playerIframe) {
      playerFrameDoc = playerIframe.contentWindow.document;
      trackNameEl = playerFrameDoc.querySelector("#track-name a");
    }
    console.log(trackNameEl);
    if (trackNameEl) {
      pushNowPlaying(trackNameEl.innerText);
    }
  }

  setInterval(loop, 5000);
}

function logger(message) {
  console.log("SpotifyScraper: " + message);
}

findNowPlaying();