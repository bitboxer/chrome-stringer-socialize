function install_notice() {
    if (localStorage.getItem("install_time"))
        return;

    var now = new Date().getTime();
    localStorage.setItem("install_time", now);
    chrome.tabs.create({url: "html/options.html"});
}
install_notice();

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getStringerURLs") {
    sendResponse({urls: [
      JSON.parse(localStorage.getItem("urls"))
    ]});
  } else {
    sendResponse({});
  }
});
