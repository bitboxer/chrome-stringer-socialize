$(function() {
  var urls = [];

  function redraw() {
    $(".js-urls").empty();
    if (urls.length > 0) {
      urls.forEach(function(item, idx) {
        $(".js-urls").append("<li>" + item + " " +
                             "<a href='#' class='js-delete delete' data-id='" + idx +"'>"+
                             "<i class='icon-remove' aria-label='remove entry'></i>"+
                             "</a></li>");
      });
      $(".empty").hide();
    } else {
      $(".empty").show();
    }

    $(".js-delete").click(function() {
      deleteUrl(parseInt($(this).attr("data-id"), 10));
    });
  }

  function load() {
    try {
      urls = JSON.parse(localStorage.getItem("urls"));
    } catch(e) {
      urls = [];
    }
  }

  function save() {
    localStorage.setItem("urls", JSON.stringify(urls));
  }

  function addUrl(url) {
    url = url.match("(?:http(?:s)?://)?(.*)")[1];
    urls.push(url);
    save();
    redraw();
  }

  function deleteUrl(item) {
    urls.splice(item, 1);
    save();
    redraw();
  }

  load();
  redraw();

  $(".add-button").click(function() {
    addUrl($(".add-url").val());
    $(".add-url").val("");
    return false;
  });
});
