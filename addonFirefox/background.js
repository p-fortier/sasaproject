var sender;
var headers = [];


function logHeaders(requestDetails){
  console.log("LOGHEADERS");
  var req = new XMLHttpRequest();
  req.open( "POST", "http://localhost:3000/association/3", false);
  req.responseType = "string";
  req.setRequestHeader("Content-type", "application/json");
  req.onload = function() {
    headers = JSON.parse(req.response);
    console.log(headers);
  }
  var body= {};
  for(var i = 0; i < requestDetails.requestHeaders.length; i++){
    var header = requestDetails.requestHeaders[i];
    body[header.name] = header.value;
  }
  // console.log(body);
  req.send(JSON.stringify(body));

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
  {urls: ["<all_urls>"], types: ["main_frame"]},
  ["blocking", "requestHeaders"]
);

//TODO: MAKE sendFakeQueries function !
browser.webRequest.onSendHeaders.addListener(
  sendFakeQueries,
  {urls: ["<all_urls>"]},
  ["requestHeaders"]
)
