$(function() {
  var urls = [];
  var settings = {};

  function redrawUrls() {
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

  function parseStorage(key, defaultvalue) {
    var item = defaultvalue;
    try {
      if (localStorage.getItem(key) != null) {
        item = JSON.parse(localStorage.getItem(key));
      }
    } catch(e) {
      item = defaultvalue;
    }
    return item;
  }

  function load() {
    urls = parseStorage("urls", []);
    settings = parseStorage("settings", {});
  }

  function save() {
    localStorage.setItem("urls", JSON.stringify(urls));
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  function addUrl(url) {
    url = url.match("(?:http(?:s)?://)?(.*)")[1];
    urls.push(url);
    save();
    redrawUrls();
  }

  function deleteUrl(item) {
    urls.splice(item, 1);
    save();
    redrawUrls();
  }

  function initCheckboxes() {
    $.each(settings, function(key) {
      match = key.match(/checkbox_(.*)/)
      if (match) {
        $("#"+match[1]).prop( "checked", settings[key] );
      }
    });
  }

  load();
  redrawUrls();
  initCheckboxes();

  $("input[type=checkbox]").change(function() {
    settings["checkbox_" + $(this).attr("id")] = $(this).is(":checked");
    save();
  });

  $(".add-button").click(function() {
    addUrl($(".add-url").val());
    $(".add-url").val("");
    return false;
  });
});
