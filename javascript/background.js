chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getStringerURLs") {
    sendResponse({urls: [
      "stringer.bitboxer.de"
    ]});
  } else {
    sendResponse({});
  }
});
