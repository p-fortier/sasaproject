var headers = {};

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}

function getHeaders(requestDetails){
  console.log("LOGHEADERS");
  var req = createCORSRequest( "POST", "http://localhost:3000/association/3");
  req.responseType = "string";
  req.setRequestHeader("Content-type", "application/json");
  req.onload = function() {
    headers = JSON.parse(req.response);
    console.log(headers.length);
  }
  var body= {};
  for(var i = 0; i < requestDetails.requestHeaders.length; i++){
    var header = requestDetails.requestHeaders[i];
    body[header.name] = header.value;
  }
  // console.log(body);
  req.send(JSON.stringify(body));
}


function makeFakeQueries(requestDetails) {
  console.log("send HEaders");
  for (var i in headers){
    var fakereq = createCORSRequest(requestDetails.method, requestDetails.url);
    for(var header in requestDetails.requestHeaders){
      fakereq.setRequestHeader(requestDetails.requestHeaders[header].name, requestDetails.requestHeaders[header].value);
    }
    var body = {};
    var fakeheaders = headers[i];
    fakereq.setRequestHeader("Accept", fakeheaders.accept_default);
    fakereq.setRequestHeader("User-Agent", fakeheaders.useragent);
    fakereq.setRequestHeader("Accept-Language", fakeheaders.accept_lang["en-US"]);
    fakereq.setRequestHeader("Accept-Encoding", fakeheaders.accept_encoding);
    fakereq.send();
  }
}

browser.webRequest.onBeforeSendHeaders.addListener(
  getHeaders,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);

browser.webRequest.onSendHeaders.addListener(
  makeFakeQueries,
  {urls: ["<all_urls>"]},
  ["requestHeaders"]
)
