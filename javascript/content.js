chrome.extension.sendRequest({method: "getStringerURLs"}, function(response) {
  response.urls.forEach(function(url) {
    if (window.location.href.match("http(s)?://" + url + ".*")) {

      function getUrlForArticle(el) {
        return $(".story-body h1 a", el).attr("href");
      }

      function addReadability(el) {
        var url = getUrlForArticle(el);
        $(".story-actions-container .story-actions", el).
          prepend("<div class='story-readability'>"+
                  "<img src='" + chrome.extension.getURL('images/readability_16.png')  + "'/>"+
                  "<a href='#readability'>now</a> | " +
                  "<a target='_blank' href='http://www.readability.com/save?url="+url+"'>later</a>"+
                  "</div>");
        $(".story-readability", el).click(function() {
          clickReadability(el);
          return false;
        });
      }

      function clickReadability(el) {
        var url = getUrlForArticle(el);
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
  });
});
