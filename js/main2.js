console.log("%c Proudly Crafted with ZiOn.", "background: #222; color: #bada55");
(function() {
  $(window).on("load", function() {
    $(".loader").fadeOut();
    $(".page-loader").delay(350).fadeOut("slow")
  });
  $(document).ready(function() {
    wow = new WOW({
      mobile: false
    });
    wow.init();
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $(".scroll-up").fadeIn()
      } else {
        $(".scroll-up").fadeOut()
      }
    });
    $('a[href="#totop"]').click(function() {
      $("html, body").animate({
        scrollTop: 0
      }, "slow");
      return false
    });
    var m = $(".home-section"),
      v = $(".navbar-custom"),
      w = v.height(),
      s = $("#works-grid"),
      u = Math.max($(window).width(), window.innerWidth),
      q = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      q = true
    }
    p(m);
    r(v, m, w);
    o(u);
    x(u, q);
    $(window).resize(function() {
      var a = Math.max($(window).width(), window.innerWidth);
      p(m);
      x(a, q)
    });
    $(window).scroll(function() {
      n(m, this);
      r(v, m, w)
    });
    var t = $(".home-section, .module, .module-small, .side-image");
    t.each(function(a) {
      if ($(this).attr("data-background")) {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
      }
    });

    function p(a) {
      if (a.length > 5000) {
        if (a.hasClass("home-full-height")) {
          a.height($(window).height())
        } else {
          a.height($(window).height() * 0.85)
        }
      }
    }

    function n(a, d) {
      if (a.length > 0) {
        var b = a.height();
        var c = $(document).scrollTop();
        if ((a.hasClass("home-parallax")) && ($(d).scrollTop() <= b)) {
          a.css("top", (c * 0.55))
        }
        if (a.hasClass("home-fade") && ($(d).scrollTop() <= b)) {
          var e = $(".caption-content");
          e.css("opacity", (1 - c / a.height() * 1))
        }
      }
    }
    if ($(".hero-slider").length > 0) {
      $(".hero-slider").flexslider({
        animation: "fade",
        animationSpeed: 1000,
        animationLoop: true,
        prevText: "",
        nextText: "",
        before: function(a) {
          $(".titan-caption").fadeOut().animate({
            top: "-80px"
          }, {
            queue: false,
            easing: "swing",
            duration: 700
          });
          a.slides.eq(a.currentSlide).delay(500);
          a.slides.eq(a.animatingTo).delay(500)
        },
        after: function(a) {
          $(".titan-caption").fadeIn().animate({
            top: "0"
          }, {
            queue: false,
            easing: "swing",
            duration: 700
          })
        },
        useCSS: true
      })
    }

    function r(d, a, b) {
      var c = $(window).scrollTop();
      if (d.length > 0 && a.length > 0) {
        if (c >= b) {
          d.removeClass("navbar-transparent")
        } else {
          d.addClass("navbar-transparent")
        }
      }
    }

    function o(a) {
      if (a > 767) {
        $(".navbar-custom .navbar-nav > li.dropdown").hover(function() {
          var b = $(".dropdown-menu", $(this)).offset().left;
          var d = $(".dropdown-menu", $(this)).width();
          if (a - b < d * 2) {
            $(this).children(".dropdown-menu").addClass("leftauto")
          } else {
            $(this).children(".dropdown-menu").removeClass("leftauto")
          }
          if ($(".dropdown", $(this)).length > 0) {
            var c = $(".dropdown-menu", $(this)).width();
            if (a - b - d < c) {
              $(this).children(".dropdown-menu").addClass("left-side")
            } else {
              $(this).children(".dropdown-menu").removeClass("left-side")
            }
          }
        })
      }
    }

    function x(c, a) {
      if ((c > 767) && (a !== true)) {
        $(".navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown").removeClass("open");
        var d = 0;
        var b;
        $(".navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown").hover(function() {
          var e = $(this);
          b = setTimeout(function() {
            e.addClass("open");
            e.find(".dropdown-toggle").addClass("disabled")
          }, d)
        }, function() {
          clearTimeout(b);
          $(this).removeClass("open");
          $(this).find(".dropdown-toggle").removeClass("disabled")
        })
      } else {
        $(".navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown").unbind("mouseenter mouseleave");
        $(".navbar-custom [data-toggle=dropdown]").not(".binded").addClass("binded").on("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          $(this).parent().siblings().removeClass("open");
          $(this).parent().siblings().find("[data-toggle=dropdown]").parent().removeClass("open");
          $(this).parent().toggleClass("open")
        })
      }
    }
    $(document).on("click", ".navbar-collapse.in", function(a) {
      if ($(a.target).is("a") && $(a.target).attr("class") != "dropdown-toggle") {
        $(this).collapse("hide")
      }
    })
  })
})(jQuery);
