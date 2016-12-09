var req = new XMLHttpRequest();
var myPort = browser.runtime.connect({name:"getheaders"});
console.log("connected port");
myPort.postMessage({greeting: "hello from content script"});

console.log("START CONTENT-SCRIPT")

req.open( "GET", "http://localhost:3000/headers", true);
req.responseType = "string";
req.onload = function() {
  console.log(JSON.stringify(JSON.parse(req.response)));
  myPort.postMessage({header: req.response});
}

myPort.onMessage.addListener(function(m) {
  console.log("In content script, received message from background script: ");
  console.log(m.greeting);
  console.log("sending mesage");
  req.send();
});
