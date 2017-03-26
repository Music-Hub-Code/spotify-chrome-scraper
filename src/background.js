var config = {
  apiKey: "AIzaSyAtnwNgh3qzpYFwurHb0Myg7k8ZLnRyTTA",
  authDomain: "crowddj-be2bb.firebaseapp.com",
  databaseURL: "https://crowddj-be2bb.firebaseio.com",
  storageBucket: "crowddj-be2bb.appspot.com",
  messagingSenderId: "310782812217"
};
firebase.initializeApp(config);


function inject() {
  chrome.tabs.query({url: 'https://play.spotify.com/*'}, function(tabs) {
    if (tabs.length != 0) {
      console.log("injecting...");
      console.log(tabs);
      chrome.tabs.executeScript(tabs[0].id, {file: "inject.js"});
    }
  });
}


var roomName = null;
var currentlyPlaying = null;
chrome.runtime.onMessage.addListener(function(data) {
  if (data.room) {
    console.log("Updated room to " + data.room);
    roomName = data.room;
  }
  else if (roomName && currentlyPlaying != data.name && currentlyPlaying != data.artist) {
    currentlyPlaying = data;
    var updates = {};
    updates['/name'] = data.name;
    updates['/artist'] = data.artist;
    updates['/trackId'] = data.trackId;
    firebase.database().ref("rooms/" + roomName + '/current').update(updates);
  }
});

chrome.webNavigation.onCompleted.addListener(function(details) {
    inject();
}, {
    url: [{
        hostContains: 'play.spotify.com'
    }],
});
