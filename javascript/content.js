chrome.extension.sendRequest({method: "getSettings"}, function(response) {
  response.urls.forEach(function(url) {
    if (window.location.href.match("http(s)?://" + url + ".*")) {

      function getUrlForArticle(el) {
        return $(".story-body h1 a", el).attr("href");
      }
      function getTitleForArticle(el) {
        return $(".story-body h1 a", el).text();
      }

      function addReadability(el) {
        var url = getUrlForArticle(el);
        $(".story-actions-container .story-actions", el).
          prepend("<div class='socialize story-readability'>"+
                  "<img src='" + chrome.extension.getURL('images/readability_16.png')  + "'/>"+
                  "<a class='story-readability-now' href='#readability'>now</a> | " +
                  "<a target='_blank' href='http://www.readability.com/save?url="+url+"'>later</a>"+
                  "</div>");
        $(".story-readability-now", el).click(function() {
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

      function addTwitter(el) {
        var url = getUrlForArticle(el);
        $(".story-actions-container .story-actions", el).
          prepend("<div class='socialize story-twitter'>"+
                  "<a class='story-twitter-now' href='#twitter'><i class='icon-twitter' aria-label='twitter'></i></a>" +
                  "</div>");
        $(".story-twitter-now", el).click(function() {
          clickTwitter(el);
          return false;
        });
      }

      function clickTwitter(el) {
        var url = getUrlForArticle(el);
        var title = getTitleForArticle(el);
        var width  = 575,
          height = 400,
          left   = ($(window).width()  - width)  / 2,
          top    = ($(window).height() - height) / 2,
          url    = "http://twitter.com/share?text=" + encodeURIComponent(title) + "&url=" + url,
          opts   = 'status=1' +
            ',width='  + width  +
            ',height=' + height +
            ',top='    + top    +
            ',left='   + left;

        window.open(url, 'twitter', opts);
      }

      $(".story-body-container").each(function(idx, el) {
        if (response.settings.checkbox_readability) {
          addReadability(el);
        }
        if (response.settings.checkbox_twitter) {
          addTwitter(el);
        }
      });

    }
  });
});
