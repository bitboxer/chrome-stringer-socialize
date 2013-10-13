function install_notice() {
    if (localStorage.getItem("install_time"))
        return;

    var now = new Date().getTime();
    localStorage.setItem("install_time", now);
    chrome.tabs.create({url: "html/options.html"});
}
install_notice();

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSettings") {
    sendResponse({
      urls: [JSON.parse(localStorage.getItem("urls"))],
      settings: JSON.parse(localStorage.getItem("settings"))
    });
  } else {
    sendResponse({});
  }
});
