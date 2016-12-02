var privacyserveur = "localhost"


if( typeof XMLHttpRequest == "undefined" ){
        var req = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
                            .createInstance();
}
else{
        var req = new XMLHttpRequest();
}
function getFakeHeaders(){
  try{
    req.open( "GET", "http://" + privacyserveur + "/fakeheaders");
    var timeOutID = httpNowhere._getWindow().setTimeout(function () {
        req.abort();
        Services.prompt.alert(null,"Info","nok "+ "https://" + request.URI.host
          + request.URI.path );
    }, (redirectTimer));

    req.onreadystatechange = function (e) {

      if (req.readyState==4){
          Services.prompt.alert(null,"Info","ok "+ "https://" + request.URI.host
                                                 + request.URI.path );
          req.abort();
      }
    }
    req.send();

  }catch(err) {
    Services.prompt.alert(null,"Info",err);
  }
}
function logURL(requestDetails) {
  targetPage = requestDetails.uri;
  console.log("Loading: " + requestDetails.url);
}

function sendFakeRequest(requestDetails){
  this.getFakeHeaders();
  console.log("rien...")
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);

browser.webRequest.onBeforeSendHeaders.addListener(
  sendFakeRequest,
  {urls: ["<all_urls>"]}
);
