if (window.location.href.match("http(s)?://stringer.bitboxer.de/.*")) {

  function addReadability(el) {
    $(".story-actions-container .story-actions", el).
      prepend("<a href='#readability' class='story-readability'>" + 
              "<img src='" + chrome.extension.getURL('images/readability_16.png')  + "'/></a>");

    $(".story-readability", el).click(function() {
      clickReadability(el);
      return false;
    });
  }

  function clickReadability(el) {
    var url = $(".story-body h1 a", el).attr("href");
    $.ajax({
      url: "http://www.readability.com/api/content/v1/parser?url=" + encodeURIComponent(url) +
      "&token=4a5c134cf591219667bbb8c74dc825b78bf224de",
    }).done(function(data) {
      $(".story-body", el).empty().append(
        "<h1><a href='" + url + "'>" + data.title + "</a></h1>" +
        $(data.content).html());
    }).fail(function() {
      alert("Sorry, I had problems fetching the text through readability.com");
    });
  }

  $(".story-body-container").each(function(idx, el) {
    addReadability(el);
  });
}
