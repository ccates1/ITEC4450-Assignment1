if (typeof window.location.origin === "undefined"){
  window.location.origin = window.location.protocol + "//" + window.location.host;
}

var utils = {
  renderPageTemplate: function(templateId, data) {
    var _data = data || {};
    var templateScript = $(templateId).html();
    var template = Handlebars.compile(templateScript);
    $("#page-container").empty();
    $("#page-container").append(template(_data));
  },
  fetch: function(url, data) {
    var _data = data || {};
    return $.ajax({
      context: this,
      url: window.location.origin + "/" + url,
      data: _data,
      method: "GET",
      dataType: "JSON"
    });
  }
};

var router = {
  routes: {},
  init: function() {
    this.bindEvents();
    $(window).trigger("hashchange");
  },
  bindEvents: function() {
    $(window).on("hashchange", this.render.bind(this));
  },
  render: function() {
    var keyName = window.location.hash.split("/")[0];
    var url = window.location.hash;
    $("#page-container")
    .find(".active")
    .hide()
    .removeClass("active");
    if(this.routes[keyName]) {
      this.routes[keyName](url);
    }
  }
};

var spaRoutes = {
  "#home": function(url) {
    utils.renderPageTemplate("#home-page-template");
  },
  "#about": function(url) {
    utils.renderPageTemplate("#aboutMe-page-template");
    $(document).ready(function() {
        $('#test').click(function() {
            alert("button");
            console.log('test');
        });
    });
  },
  "#contact": function(url) {
    utils.renderPageTemplate("#contactMe-page-template");
    $(document).ready(function() {
      $('#submit-btn').click(function() {
        var x = document.forms['request-form']['email'].value;
        var y = document.forms['request-form']['firstname'].value;
        var z = document.forms['request-form']['lastname'].value;
          if (x === '') {
              toastr.error('Your email is required!', 'Error');
              return false;
          } else if (y === '') {
              toastr.error('Your first name is required!', 'Error');
              return false;
          } else if (z === '') {
              toastr.error('Your last name is required!', 'Error');
              return false;
          }
        document.getElementById('form-elements').style.display = 'none';
        toastr.success('Your request form has been submitted!', 'Success');
      });
    });
  }
};
var spaRouter = $.extend({}, router, {
  routes: spaRoutes
});

spaRouter.init();
window.location.hash = "#home";
