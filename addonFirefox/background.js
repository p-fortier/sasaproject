var sender;
var headers = [];


function logHeaders(requestDetails){
  var req = new XMLHttpRequest();
  req.open( "GET", "http://localhost:3000/getselectedheaders/7", false);
  req.responseType = "string";
  req.onload = function() {
    console.log(JSON.stringify(req.response));
    headers: JSON.parse(req.response, null, 2);
  }
  req.send();

  for (var i=0; i < headers.length; i++) {
    var header = headers[i];
    console.log(header);
  }
}


function connected(p) {
  console.log("Connect function");
  sender = p;
  sender.postMessage();
  sender.onMessage.addListener((message) => {
    headers = message.headers;
  });
}


browser.runtime.onConnect.addListener(connected);
browser.webRequest.onBeforeSendHeaders.addListener(
  logHeaders,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);
