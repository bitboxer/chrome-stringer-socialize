chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getStringerURLs") {
    sendResponse({urls: [
      JSON.parse(localStorage["urls"])
    ]});
  } else {
    sendResponse({});
  }
});
