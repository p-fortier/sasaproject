var sender;

function logURL(requestDetails) { 
  sender.onMessage.addListener((message) => {
    console.log("message ::::" + message.headers)
    return {
      text: "ehello"
    }
  })
}
browser.runtime.onConnect.addListener(connected);
function logHeaders(requestDetails){
  // console.log(requestDetails);
}

function connected(p) {
  console.log("Connect function");
  sender = p;
  sender.postMessage({greeting: "hi there content script!"});
}
browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]},
  ["blocking"]
);
browser.webRequest.onBeforeSendHeaders.addListener(
  logHeaders,
  {urls: ["<all_urls>"]}
);
