console.log("START CONTENT-SCRIPT");
var req = new XMLHttpRequest();
var myPort = browser.runtime.connect({name:"getheaders"});
console.log("connected port");

req.open( "GET", "http://localhost:3000/getselectedheaders/7", true);
req.responseType = "string";
req.onload = function() {
  myPort.postMessage({headers: JSON.parse(req.response)});
}

myPort.onMessage.addListener(function(m) {
  console.log("sending mesage");

});
