$(document).ready(function () {
  $("#room").submit(function (e) {
    e.preventDefault();
    console.log(e);
    var val = e.currentTarget[0].value;
    chrome.runtime.sendMessage("hnhjaebhalmancjhbiekecemgllhaecj", {room: val}, (response) => {});
    return false;
  });
});
