if (window.location.href.match("http(s)?://stringer.bitboxer.de/.*")) {
  $(".story-body-container").each(function(idx, el) {
    $(".story-actions-container .story-actions", el).
      prepend("<a href='#readability' class='story-readabilty'>" + 
              "<img src='" + chrome.extension.getURL('images/stringer16.png')  + "'/></a>");
    $(".story-readabilty", el).click(function() {
      var url = $(".story-body h1 a", el).attr("href");
      $.ajax({
        url: "http://www.readability.com/api/content/v1/parser?url=" + encodeURIComponent(url) +
             "&token=4a5c134cf591219667bbb8c74dc825b78bf224de",
      }).done(function(data) {
        $(".story-body", el).empty().append(
          "<h1><a href='" + url + "'>" + data.title + "</a></h1>" +
          $(data.content).html());
      });
      return false;
    });
  });
}
