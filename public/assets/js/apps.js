/* Validation form */
validateForm("validation-contact");
validateForm("validation-newsletter");
// validateForm('validation-cart');
// validateForm('validation-user');

NN_FRAMEWORK.Random = function () {
  setTimeout(function () {
    $("#loader-wrapper").addClass("show1");
  }, 1000);
  setTimeout(function () {
    $("#loader-wrapper").remove();
  }, 3000);

  $(window).bind("load", function () {
    $(".peShiner").each(function () {
      var _id = $(this).data("id");
      var api = $(".peShiner-" + _id).peShiner({
        api: true,
        paused: true,
        reverse: true,
        repeat: 1,
        color: "monoHL", // fire,fireHL,lime,limeHL,ocean,oceanHL,purple,purpleHL,sepia,sepiaHL,mono,monoHL,steel,white,black,red,redHL,green,greenHL,blue,blueHL
      });
      api.resume();
    });
  });
};
NN_FRAMEWORK.ZoomThumb = function () {
  if ($(".zoom_thumb").length > 0) {
    $(".zoom_thumb")
      .on("mouseover", function () {
        $(this).children("picture").css({ transform: "scale(2)" });
      })
      .on("mouseout", function () {
        $(this).children("picture").css({ transform: "scale(1)" });
      })
      .on("mousemove", function (e) {
        $(this)
          .children("picture")
          .css({
            "transform-origin":
              ((e.pageX - $(this).offset().left) / $(this).width()) * 100 +
              "% " +
              ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +
              "%",
          });
      });
  }
};
NN_FRAMEWORK.AOS = function () {
  function onElementHeightChange(elm, callback) {
    var lastHeight = elm.clientHeight;
    var newHeight;

    (function run() {
      newHeight = elm.clientHeight;
      if (lastHeight !== newHeight) callback();
      lastHeight = newHeight;

      if (elm.onElementHeightChangeTimer) {
        clearTimeout(elm.onElementHeightChangeTimer);
      }

      elm.onElementHeightChangeTimer = setTimeout(run, 500);
    })();
  }
  AOS.init({
    duration: 1000,
    once: true,
  });
  onElementHeightChange(document.body, function () {
    AOS.refresh();
  });
};

NN_FRAMEWORK.Splide = function () {
  if (isExist($(".splide.slideshow:not(.is-initialized)"))) {
    new Splide(".splide.slideshow", {
      type: "loop",
      autoplay: true,
      interval: 2000,
      perPage: 1,
      perMove: 1,
      gap: 0,
      pagination: true,
      arrows: true,
    }).mount();
  }

  if (isExist($(".splide.sach:not(.is-initialized)"))) {
    new Splide(".splide.sach", {
      type: "loop",
      autoplay: true,
      interval: 3000,
      perPage: 1,
      perMove: 1,
      gap: 0,
      pagination: false,
      arrows: true,
    }).mount();
  }

  if (isExist($(".splide.partner:not(.is-initialized)"))) {
    new Splide(".splide.partner", {
      type: "loop",
      autoplay: false,
      interval: 1000,
      perPage: 6,
      perMove: 1,
      gap: 15,
      pagination: false,
      arrows: true,
    }).mount();
  }

  if (isExist($(".splide.about:not(.is-initialized)"))) {
    new Splide(".splide.about", {
      type: "loop",
      autoplay: true,
      interval: 2500,
      perPage: 3,
      perMove: 1,
      gap: 15,
      pagination: false,
      arrows: false,
      breakpoints: {
        768: {
          perPage: 2,
          perMove: 1,
        },
        480: {
          perPage: 1,
          perMove: 1,
        },
      },
    }).mount();
  }
  if (isExist($(".splide.feedback:not(.is-initialized)"))) {
    new Splide(".splide.feedback", {
      type: "loop",
      autoplay: true,
      interval: 2500,
      perPage: 3,
      perMove: 1,
      gap: 27,
      pagination: false,
      arrows: false,
      breakpoints: {
        768: {
          perPage: 2,
          perMove: 1,
        },
      },
    }).mount();
  }
  if (isExist($(".splide.news:not(.is-initialized)"))) {
    new Splide(".splide.news", {
      type: "slide",
      rewind: true,
      autoplay: true,
      interval: 2500,
      perPage: 4,
      perMove: 1,
      gap: 27,
      pagination: false,
      arrows: false,
      breakpoints: {
        768: {
          perPage: 3,
          perMove: 1,
        },
        480: {
          perPage: 2,
          perMove: 1,
        },
      },
    }).mount();
  }

  if (isExist($(".splide.vertical_news:not(.is-initialized)"))) {
    var splide = new Splide(".splide.vertical_news", {
      type: "loop",
      autoplay: true,
      interval: 2500,
      pagination: false,
      arrows: false,
      perPage: 3,
      perMove: 1,
      gap: 15,
      pauseOnHover: true,
      direction: "ttb",
      height: "auto",
      drag: true, //Free
    });
    splide.on("ready", function () {
      let totalGap = splide.options.gap * (splide.options.perPage - 1);
      let firstSlide = splide.Components.Slides.getAt(0).slide;
      let containerHeight =
        splide.options.perPage * firstSlide.clientHeight + 1 + totalGap;
      splide.options = {
        height: containerHeight + "px",
      };
    });
    splide.mount();
  }

  var videoMain;
  var videoNav;
  if (isExist($(".splide.videoMain:not(.is-initialized)"))) {
    videoMain = new Splide(".splide.videoMain", {
      type: "loop",
      pagination: false,
      arrows: true,
    });
  }
  if (isExist($(".splide.videoNav:not(.is-initialized)"))) {
    videoNav = new Splide(".splide.videoNav", {
      perPage: 4,
      perMove: 1,
      gap: 10,
      pagination: false,
      arrows: false,
      isNavigation: true,
    });
  }
  if (videoNav != null) videoMain.sync(videoNav);
  if (videoMain != null) videoMain.mount();
  if (videoNav != null) videoNav.mount();

  var prodetailThumb;
  var prodetailNav;
  if (isExist($(".splide.prodetailThumb:not(.is-initialized)"))) {
    prodetailThumb = new Splide(".splide.prodetailThumb", {
      type: "loop",
      pagination: false,
      arrows: true,
    });
  }
  if (isExist($(".splide.prodetailNav:not(.is-initialized)"))) {
    prodetailNav = new Splide(".splide.prodetailNav", {
      perPage: 5,
      perMove: 1,
      gap: 10,
      pagination: false,
      arrows: false,
      isNavigation: true,
    });
  }
  if (prodetailNav != null) prodetailThumb.sync(prodetailNav);
  if (prodetailThumb != null) prodetailThumb.mount();
  if (prodetailNav != null) prodetailNav.mount();
};

/* Lazys */
NN_FRAMEWORK.Lazys = function () {
  if ($(".lazy").length > 0) {
    var lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy",
    });
  }
};

/* Load name input file */
NN_FRAMEWORK.loadNameInputFile = function () {
  if (isExist($(".custom-file input[type=file]"))) {
    $("body").on("change", ".custom-file input[type=file]", function () {
      var fileName = $(this).val();
      fileName = fileName.substr(
        fileName.lastIndexOf("\\") + 1,
        fileName.length
      );
      $(this).siblings("label").html(fileName);
    });
  }
};

/* Back to top */
NN_FRAMEWORK.GoTop = function () {
  $(window).scroll(function () {
    if (!$(".scrollToTop").length)
      $("body").append(
        '<div class="scrollToTop"><img src="' + GOTOP + '" alt="Go Top"/></div>'
      );
    if ($(this).scrollTop() > 100) $(".scrollToTop").fadeIn();
    else $(".scrollToTop").fadeOut();
  });

  $("body").on("click", ".scrollToTop", function () {
    $("html, body").animate({ scrollTop: 0 }, 0);
    return false;
  });
};

/* Alt images */
NN_FRAMEWORK.AltImg = function () {
  var imgElements = document.querySelectorAll("img");
  imgElements.forEach(function (img) {
    if (!img.hasAttribute("alt")) {
      img.alt = WEBSITE_NAME;
    }
  });

  var anchorElements = document.querySelectorAll("a");
  anchorElements.forEach(function (anchor) {
    if (!anchor.hasAttribute("aria-label")) {
      anchor.setAttribute("aria-label", WEBSITE_NAME);
    }
  });
};

/* Menu */
NN_FRAMEWORK.Menu = function () {
  if (isExist(".plus-nClick")) {
    $(".plus-nClick").click(function (e) {
      e.preventDefault();
      $(this).parents(".has-submenu").toggleClass("opened");
      $(this).parents(".has-submenu").children("ul").slideToggle(200);
    });

    $("li.has-submenu").each(function () {
      if (isExist($(this).find("ul"))) {
        $(this).find("a > span").show();
      }
    });
  }

  if (isExist(".menu_lvl")) {
    $(".menu_lvl > ul > li").hover(function () {
      var vitri = $(this).position().top;
      $(this)
        .find(".menu_lvl")
        .css({ top: vitri + "px" });
    });
  }

  $(window).scroll(function () {
    if ($(window).scrollTop() >= $(".header_wrap").height()) {
      $(".menu").addClass("menu_fix");
    } else {
      $(".menu").removeClass("menu_fix");
    }
  });

  /* Menu remove empty ul */
  if (isExist($(".menu"))) {
    $(".menu ul li a").each(function () {
      $this = $(this);

      if (!isExist($this.next("ul").find("li"))) {
        $this.next("ul").remove();
        $this.removeClass("has-child");
      }
    });
  }

  /* Mmenu */
  // if (isExist($('nav#menu'))) {
  // 	$('nav#menu').mmenu({
  // 		extensions: ['border-full', 'position-left', 'position-front']
  // 	});
  // }

  /* Menu mobile */
  var menu_mobi = $("ul.menu_desktop").html();
  $(".load-menu ul").append(menu_mobi);
  $(".load-menu ul li").removeClass();

  $(".menu_mobi_add ul li").each(function (index, element) {
    if ($(this).children("div").children("ul").children("li").length > 0) {
      $(this).children("a").append('<i class="fas fa-chevron-right"></i>');
    }
  });
  $(".menu_mobi_add ul li a i").click(function () {
    if ($(this).parent("a").hasClass("active2")) {
      $(this).parent("a").removeClass("active2");
      if (
        $(this)
          .parent("a")
          .parent("li")
          .children("div")
          .children("ul")
          .children("li").length > 0
      ) {
        $(this)
          .parent("a")
          .parent("li")
          .children("div")
          .children("ul")
          .hide(300);
        return false;
      }
    } else {
      $(this).parent("a").addClass("active2");
      if (
        $(this).parents("li").children("div").children("ul").children("li")
          .length > 0
      ) {
        $(".menu_m ul li ul").hide(0);
        $(this).parents("li").children("div").children("ul").show(300);
        return false;
      }
    }
  });

  $(".icon_menu_mobi,.close_menu,.menu_baophu, #mmenu_trigger").click(
    function () {
      if ($(".menu_mobi_add").hasClass("menu_mobi_active")) {
        $(".menu_mobi_add").removeClass("menu_mobi_active");
        $(".menu_baophu").fadeOut(300);
      } else {
        $(".menu_mobi_add").addClass("menu_mobi_active");
        $(".menu_baophu").fadeIn(300);
      }
      return false;
    }
  );

  $(".menu_mobi_add li a").click(function () {
    $(".menu_mobi_add").removeClass("menu_mobi_active");
    $(".menu_baophu").fadeOut(300);
  });

  $(document).on("click", "#services-menu-mobile-list li a", function () {
    $(".menu_mobi_add").removeClass("menu_mobi_active");
    $(".menu_baophu").fadeOut(300);

    // Reset submenu (ẩn hết + remove active2)
    $(".menu_mobi_add ul li a.active2").removeClass("active2");
    $(".menu_mobi_add ul li div ul").hide(0);
  });
};

/* Tools */
NN_FRAMEWORK.Tools = function () {
  if (isExist($(".toolbar"))) {
    $(".footer").css({ marginBottom: $(".toolbar").innerHeight() });
  }
};

/* Popup */
NN_FRAMEWORK.Popup = function () {
  if (isExist($("#popup"))) {
    validateForm("validation-popup");
    $("#popup").modal("show");
  }
};

/* Wow */
NN_FRAMEWORK.Wows = function () {
  new WOW().init();
};

/* Photobox */
NN_FRAMEWORK.Photobox = function () {
  if (isExist($(".album-gallery"))) {
    $(".album-gallery").photobox("a", { thumbs: true, loop: false });
  }
};

/* DatePicker */
NN_FRAMEWORK.DatePicker = function () {
  if (isExist($("#birthday"))) {
    $("#birthday").datetimepicker({
      timepicker: false,
      format: "d/m/Y",
      formatDate: "d/m/Y",
      minDate: "01/01/1950",
      maxDate: TIMENOW,
    });
  }
};

/* Search */
NN_FRAMEWORK.Search = function () {
  if (isExist($(".icon-search"))) {
    $(".icon-search").click(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(".search-grid")
          .stop(true, true)
          .animate({ opacity: "0", width: "0px" }, 200);
      } else {
        $(this).addClass("active");
        $(".search-grid")
          .stop(true, true)
          .animate({ opacity: "1", width: "230px" }, 200);
      }
      document.getElementById($(this).next().find("input").attr("id")).focus();
      $(".icon-search i").toggleClass("bi bi-x-lg");
    });
  }

  if (isExist($(".search-auto"))) {
    $(".show-search").hide();
    $(".search-auto").keyup(function () {
      $keyword = $(this).val();
      if ($keyword.length >= 2) {
        $.get("tim-kiem-goi-y?keyword=" + $keyword, function (data) {
          if (data) {
            $(".show-search").show();
            $(".show-search").html(data);
          }
        });
      }
    });
  }
};

/* Videos */
NN_FRAMEWORK.Videos = function () {
  Fancybox.bind("[data-fancybox]", {});
};

/* Owl Data */
NN_FRAMEWORK.OwlData = function (obj) {
  if (!isExist(obj)) return false;
  var items = obj.attr("data-items");
  var rewind = Number(obj.attr("data-rewind")) ? true : false;
  var autoplay = Number(obj.attr("data-autoplay")) ? true : false;
  var loop = Number(obj.attr("data-loop")) ? true : false;
  var lazyLoad = Number(obj.attr("data-lazyload")) ? true : false;
  var mouseDrag = Number(obj.attr("data-mousedrag")) ? true : false;
  var touchDrag = Number(obj.attr("data-touchdrag")) ? true : false;
  var animations = obj.attr("data-animations") || false;
  var smartSpeed = Number(obj.attr("data-smartspeed")) || 800;
  var autoplaySpeed = Number(obj.attr("data-autoplayspeed")) || 800;
  var autoplayTimeout = Number(obj.attr("data-autoplaytimeout")) || 5000;
  var dots = Number(obj.attr("data-dots")) ? true : false;
  var responsive = {};
  var responsiveClass = true;
  var responsiveRefreshRate = 200;
  var nav = Number(obj.attr("data-nav")) ? true : false;
  var navContainer = obj.attr("data-navcontainer") || false;
  var navTextTemp =
    "<svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-chevron-left' width='44' height='45' viewBox='0 0 24 24' stroke-width='1.5' stroke='#fff' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><polyline points='15 6 9 12 15 18' /></svg>|<svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-chevron-right' width='44' height='45' viewBox='0 0 24 24' stroke-width='1.5' stroke='#fff' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><polyline points='9 6 15 12 9 18' /></svg>";
  var navText = obj.attr("data-navtext");
  navText =
    nav &&
    navContainer &&
    (((navText === undefined || Number(navText)) && navTextTemp) ||
      (isNaN(Number(navText)) && navText) ||
      (Number(navText) === 0 && false));

  if (items) {
    items = items.split(",");

    if (items.length) {
      var itemsCount = items.length;

      for (var i = 0; i < itemsCount; i++) {
        var options = items[i].split("|"),
          optionsCount = options.length,
          responsiveKey;

        for (var j = 0; j < optionsCount; j++) {
          const attr = options[j].indexOf(":")
            ? options[j].split(":")
            : options[j];

          if (attr[0] === "screen") {
            responsiveKey = Number(attr[1]);
          } else if (Number(responsiveKey) >= 0) {
            responsive[responsiveKey] = {
              ...responsive[responsiveKey],
              [attr[0]]: (isNumeric(attr[1]) && Number(attr[1])) ?? attr[1],
            };
          }
        }
      }
    }
  }

  if (nav && navText) {
    navText =
      navText.indexOf("|") > 0 ? navText.split("|") : navText.split(":");
    navText = [navText[0], navText[1]];
  }

  obj.owlCarousel({
    rewind,
    autoplay,
    loop,
    lazyLoad,
    mouseDrag,
    touchDrag,
    smartSpeed,
    autoplaySpeed,
    autoplayTimeout,
    dots,
    nav,
    navText,
    navContainer: nav && navText && navContainer,
    responsiveClass,
    responsiveRefreshRate,
    responsive,
  });

  if (autoplay) {
    obj.on("translate.owl.carousel", function (event) {
      obj.trigger("stop.owl.autoplay");
    });

    obj.on("translated.owl.carousel", function (event) {
      obj.trigger("play.owl.autoplay", [autoplayTimeout]);
    });
  }

  if (animations && isExist(obj.find("[owl-item-animation]"))) {
    var animation_now = "";
    var animation_count = 0;
    var animations_excuted = [];
    var animations_list = animations.indexOf(",")
      ? animations.split(",")
      : animations;

    obj.on("changed.owl.carousel", function (event) {
      $(this)
        .find(".owl-item.active")
        .find("[owl-item-animation]")
        .removeClass(animation_now);
    });

    obj.on("translate.owl.carousel", function (event) {
      var item = event.item.index;

      if (Array.isArray(animations_list)) {
        var animation_trim = animations_list[animation_count].trim();

        if (!animations_excuted.includes(animation_trim)) {
          animation_now = "animate__animated " + animation_trim;
          animations_excuted.push(animation_trim);
          animation_count++;
        }

        if (animations_excuted.length == animations_list.length) {
          animation_count = 0;
          animations_excuted = [];
        }
      } else {
        animation_now = "animate__animated " + animations_list.trim();
      }
      $(this)
        .find(".owl-item")
        .eq(item)
        .find("[owl-item-animation]")
        .addClass(animation_now);
    });
  }
};

/* Owl Page */
NN_FRAMEWORK.OwlPage = function () {
  if (isExist($(".owl-page"))) {
    $(".owl-page").each(function () {
      NN_FRAMEWORK.OwlData($(this));
    });
  }
};

/* Dom Change */
NN_FRAMEWORK.DomChange = function () {
  /* Video Fotorama */
  if (isExist($("#fotorama-videos"))) {
    $("#fotorama-videos").fotorama();
  }
  /* Video Select */
  if (isExist($(".listvideos"))) {
    $(".listvideos").change(function () {
      var id = $(this).val();
      $.ajax({
        url: "api/video.php",
        type: "POST",
        dataType: "html",
        data: {
          id: id,
        },
        beforeSend: function () {
          holdonOpen();
        },
        success: function (result) {
          $(".video-main").html(result);
          holdonClose();
        },
      });
    });
  }

  /* Chat Facebook */
  $("#messages-facebook").one("DOMSubtreeModified", function () {
    $(".js-facebook-messenger-box").on("click", function () {
      $(
        ".js-facebook-messenger-box, .js-facebook-messenger-container"
      ).toggleClass("open"),
        $(".js-facebook-messenger-tooltip").length &&
          $(".js-facebook-messenger-tooltip").toggle();
    }),
      $(".js-facebook-messenger-box").hasClass("cfm") &&
        setTimeout(function () {
          $(".js-facebook-messenger-box").addClass("rubberBand animated");
        }, 3500),
      $(".js-facebook-messenger-tooltip").length &&
        ($(".js-facebook-messenger-tooltip").hasClass("fixed")
          ? $(".js-facebook-messenger-tooltip").show()
          : $(".js-facebook-messenger-box").on("hover", function () {
              $(".js-facebook-messenger-tooltip").show();
            }),
        $(".js-facebook-messenger-close-tooltip").on("click", function () {
          $(".js-facebook-messenger-tooltip").addClass("closed");
        }));
    $(".search_open").click(function () {
      $(".search_box_hide").toggleClass("opening");
    });
  });
};

NN_FRAMEWORK.aweOwlPage = function () {
  var owl = $(".owl-carousel.in-page");
  owl.each(function () {
    var xs_item = $(this).attr("data-xs-items");
    var md_item = $(this).attr("data-md-items");
    var lg_item = $(this).attr("data-lg-items");
    var sm_item = $(this).attr("data-sm-items");
    var margin = $(this).attr("data-margin");
    var dot = $(this).attr("data-dot");
    var nav = $(this).attr("data-nav");
    var height = $(this).attr("data-height");
    var play = $(this).attr("data-play");
    var loop = $(this).attr("data-loop");

    if (typeof margin !== typeof undefined && margin !== false) {
    } else {
      margin = 30;
    }
    if (typeof xs_item !== typeof undefined && xs_item !== false) {
    } else {
      xs_item = 1;
    }
    if (typeof sm_item !== typeof undefined && sm_item !== false) {
    } else {
      sm_item = 3;
    }
    if (typeof md_item !== typeof undefined && md_item !== false) {
    } else {
      md_item = 3;
    }
    if (typeof lg_item !== typeof undefined && lg_item !== false) {
    } else {
      lg_item = 3;
    }

    if (loop == 1) {
      loop = true;
    } else {
      loop = false;
    }
    if (dot == 1) {
      dot = true;
    } else {
      dot = false;
    }
    if (nav == 1) {
      nav = true;
    } else {
      nav = false;
    }
    if (play == 1) {
      play = true;
    } else {
      play = false;
    }

    $(this).owlCarousel({
      loop: loop,
      margin: Number(margin),
      responsiveClass: true,
      dots: dot,
      nav: nav,
      navText: [
        '<div class="owlleft"><svg viewBox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;"><polyline class="a" points="11040,1920 4960,8000 11040,14080 "></polyline></svg></div>',
        '<div class="owlright"><svg viewBox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;"><polyline class="a" points="4960,1920 11040,8000 4960,14080 "></polyline></svg></div>',
      ],
      autoplay: play,
      autoplayTimeout: 4000,
      smartSpeed: 3000,
      autoplayHoverPause: true,
      autoHeight: false,
      responsive: {
        0: {
          items: Number(xs_item),
        },
        600: {
          items: Number(sm_item),
        },
        1000: {
          items: Number(md_item),
        },
        1200: {
          items: Number(lg_item),
        },
      },
    });
  });
};

NN_FRAMEWORK.Api = function () {
  if (isExist($(".myPaging"))) {
    $(document).on("click", ".myPaging .tab", function (event) {
      event.preventDefault();
      if (!$(this).hasClass("active")) {
        $(this).parent().find(".tab").removeClass("active");
        $(this).addClass("active");
        var table = $(this).data("table");
        var type = $(this).data("type");
        var eShow = $(this).data("eshow");
        var pp = $(this).data("pp") > 0 ? $(this).data("pp") : 1;
        var id_list = $(this).data("list") >= 0 ? $(this).data("list") : 0;
        var id_cat = $(this).data("cat") >= 0 ? $(this).data("cat") : 0;
        var status = $(this).data("status");

        $.ajax({
          url: "load-my-paging",
          type: "get",
          dataType: "html",
          data: {
            table_select: table,
            type_select: type,
            eShow: eShow,
            page_per: pp,
            id_list: id_list,
            id_cat: id_cat,
            status: status,
          },
        }).done(function (a) {
          $("." + eShow).html(a);
          NN_FRAMEWORK.Lazys();
        });
      }
    });
    $(".myPaging").each(function (index, el) {
      $(this).find(".tab").first().click();
    });

    // $(document).on('click', '.page-link', function (event) {
    // 	$('html, body').animate({
    // 		scrollTop: $('.myPaging').offset().top,
    // 	}, 0);
    // });
  }

  if (isExist($(".item-search"))) {
    $(".item-search input").click(function () {
      Filter();
    });
  }

  if (isExist($(".sort-select-main"))) {
    $(".sort-select-main p a").click(function () {
      $(".sort-select-main p a").removeClass("check");
      $(this).addClass("check");
      Filter();
    });
  }

  $(".filter").click(function (e) {
    $(".left-product").toggleClass("show");
  });
  TextSort();
};

NN_FRAMEWORK.Properties = function () {
  if (isExist($(".grid-properties"))) {
    $(".properties").click(function (e) {
      $(this)
        .parents(".grid-properties")
        .find(".properties")
        .removeClass("active");
      // $('.properties').removeClass('outstock');
      $(this).addClass("active");
    });
  }
};
NN_FRAMEWORK.slickPage = function () {
  if ($(".slick.in-page").length > 0) {
    $(".slick.in-page").each(function () {
      var asNavFor = $(this).attr("data-asNavFor");
      var dots = $(this).attr("data-dots");
      var infinite = $(this).attr("data-infinite");
      var speed = $(this).attr("data-speed");
      var vertical = $(this).attr("data-vertical");
      var arrows = $(this).attr("data-arrows");
      var autoplay = $(this).attr("data-autoplay");
      var autoplaySpeed = $(this).attr("data-autoplaySpeed");
      var centerMode = $(this).attr("data-centerMode");
      var centerPadding = $(this).attr("data-centerPadding");
      var slidesDefault = $(this).attr("data-slidesDefault");
      var responsive = $(this).attr("data-responsive");
      var xs_item = $(this).attr("data-xs-items");
      var md_item = $(this).attr("data-md-items");
      var lg_item = $(this).attr("data-lg-items");
      var sm_item = $(this).attr("data-sm-items");
      var slidesDefault_ar = slidesDefault.split(":");
      var xs_item_ar = xs_item.split(":");
      var sm_item_ar = sm_item.split(":");
      var md_item_ar = md_item.split(":");
      var lg_item_ar = lg_item.split(":");
      var to_show = slidesDefault_ar[0];
      var to_scroll = slidesDefault_ar[1];
      if (responsive == 1) {
        responsive = true;
      } else {
        responsive = false;
      }
      if (dots == 1) {
        dots = true;
      } else {
        dots = false;
      }
      if (arrows == 1) {
        arrows = true;
      } else {
        arrows = false;
      }
      if (infinite == 1) {
        infinite = true;
      } else {
        infinite = false;
      }
      if (autoplay == 1) {
        autoplay = true;
      } else {
        autoplay = false;
      }
      if (centerMode == 1) {
        centerMode = true;
      } else {
        centerMode = false;
      }
      if (vertical == 1) {
        vertical = true;
      } else {
        vertical = false;
      }
      if (typeof speed !== typeof undefined && speed !== false) {
      } else {
        speed = 300;
      }
      if (
        typeof autoplaySpeed !== typeof undefined &&
        autoplaySpeed !== false
      ) {
      } else {
        autoplaySpeed = 2000;
      }
      if (
        typeof centerPadding !== typeof undefined &&
        centerPadding !== false
      ) {
      } else {
        centerPadding = "0px";
      }
      var reponsive_json = [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Number(lg_item_ar[0]),
            slidesToScroll: Number(lg_item_ar[1]),
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: Number(md_item_ar[0]),
            slidesToScroll: Number(md_item_ar[1]),
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Number(sm_item_ar[0]),
            slidesToScroll: Number(sm_item_ar[1]),
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: Number(xs_item_ar[0]),
            slidesToScroll: Number(xs_item_ar[1]),
          },
        },
      ];
      if (responsive == 1) {
        $(this).slick({
          lazyLoad: "ondemand",
          asNavFor: asNavFor,
          focusOnSelect: true,
          dots: dots,
          infinite: infinite,
          arrows: arrows,
          speed: Number(speed),
          vertical: vertical,
          slidesToShow: Number(to_show),
          slidesToScroll: Number(to_scroll),
          autoplay: autoplay,
          autoplaySpeed: Number(autoplaySpeed),
          responsive: reponsive_json,
          // prevArrow: '<div class="slick_arrow prev_arrow"></div>',
          // nextArrow: '<div class="slick_arrow next_arrow"></div>',
        });
      } else {
        $(this).slick({
          lazyLoad: "ondemand",
          asNavFor: asNavFor,
          focusOnSelect: true,
          dots: dots,
          infinite: infinite,
          arrows: arrows,
          speed: Number(speed),
          vertical: vertical,
          slidesToShow: Number(to_show),
          slidesToScroll: Number(to_scroll),
          autoplay: autoplay,
          autoplaySpeed: Number(autoplaySpeed),
          // prevArrow: '<div class="slick_arrow prev_arrow"></div>',
          // nextArrow: '<div class="slick_arrow next_arrow"></div>',
        });
      }
    });
  }
};

NN_FRAMEWORK.Recaptcha = function () {
  grecaptcha.ready(function () {
    if ($("#form_contact").length > 0) {
      $("body").on("submit", "#form_contact", function (event) {
        event.preventDefault();
        grecaptcha.ready(function () {
          generateCaptcha(
            "contact",
            "recaptchaResponseContact",
            "form_contact"
          );
        });
      });
    }

    if ($("#form_newsletter").length > 0) {
      $("body").on("submit", "#form_newsletter", function (event) {
        event.preventDefault();
        grecaptcha.ready(function () {
          generateCaptcha(
            "newsletter",
            "recaptchaResponseNewsletter",
            "form_newsletter"
          );
        });
      });
    }
  });
};

NN_FRAMEWORK.ValidateInput = function () {
  if ($(".form_validation").length > 0) {
    $("body").on("click", ".btn_validation", function (e) {
      $parent = $(this).parents(".form_validation");
      var items = $parent.find(".check_valid");
      var force_stop = false;

      items.each(function () {
        var itemValidate = $(this)
          .parents(".validation-input")
          .find(".invalid_feedback");

        if (isEmpty($(this).val())) {
          $(this).focus();
          itemValidate.addClass("validated");
          force_stop = true;
          return false;
        } else {
          itemValidate.removeClass("validated");
        }

        if ($(this).hasClass("phone_valid")) {
          if (isPhone($(this).val())) {
            $(this).focus();
            itemValidate.addClass("validated");
            force_stop = true;
            return false;
          } else {
            itemValidate.removeClass("validated");
          }
        }

        if ($(this).hasClass("email_valid")) {
          if (isEmail($(this).val())) {
            $(this).focus();
            itemValidate.addClass("validated");
            force_stop = true;
            return false;
          } else {
            itemValidate.removeClass("validated");
          }
        }
      });

      if (force_stop) return false;
    });
  }

  $(document).click(function () {
    $(".invalid_feedback.validated").removeClass("validated");
  });
};

NN_FRAMEWORK.load_token = (callback) => {
  if (typeof CSRF_TOKEN != "undefined" && CSRF_TOKEN) {
    if (typeof window["TOKEN"] == "undefined") {
      fetch(CSRF_TOKEN)
        .then((json) => json.text())
        .then((result) => {
          window["TOKEN"] = result;
          callback(result);
        });
    } else {
      callback(window["TOKEN"]);
    }
  }
};

NN_FRAMEWORK.addTokenToFroms = (token) => {
  const items = document.querySelectorAll(
    '.csrf_token:not([value]), .csrf_token[value=""]'
  );
  if (items) {
    for (const v of items) {
      v.value = token;
    }
  }
};
function resizeFlipbook() {
  // Add your resize logic here
  // Example:
  // const flipbook = $('.flipbook');
  // if (flipbook.length) {
  //   flipbook.turn('size', $(window).width(), $(window).height());
  // }
}
NN_FRAMEWORK.Flipbook = function () {
  if (isExist($(".flipbook"))) {
    $(".flipbook").turn({
      width: 960,
      height: 630,
      elevation: 50,
      gradients: true,
      autoCenter: true,
      display: "double",
      page: 2,
    });
    $(".turn-next").click(function (event) {
      $(".flipbook").turn("next");
    });
    $(".turn-prev").click(function (event) {
      $(".flipbook").turn("previous");
    });
    resizeFlipbook();
    $(window).resize(function () {
      resizeFlipbook();
    });
  }
};
/* Ready */
$(document).ready(function () {
  NN_FRAMEWORK.load_token((value) => {
    NN_FRAMEWORK.Api();
    NN_FRAMEWORK.addTokenToFroms(value);
  });
  NN_FRAMEWORK.Lazys();
  NN_FRAMEWORK.Popup();
  NN_FRAMEWORK.AltImg();
  NN_FRAMEWORK.GoTop();
  NN_FRAMEWORK.Menu();
  // NN_FRAMEWORK.OwlPage();
  // NN_FRAMEWORK.slickPage();
  NN_FRAMEWORK.Videos();
  NN_FRAMEWORK.Photobox();
  NN_FRAMEWORK.Search();
  NN_FRAMEWORK.DomChange();
  NN_FRAMEWORK.DatePicker();
  NN_FRAMEWORK.loadNameInputFile();
  NN_FRAMEWORK.Properties();
  NN_FRAMEWORK.ValidateInput();
  NN_FRAMEWORK.ZoomThumb();
  NN_FRAMEWORK.Flipbook();
  NN_FRAMEWORK.Random();
  NN_FRAMEWORK.Splide();
  if (RECAPTCHA_ACTIVE) {
    NN_FRAMEWORK.Recaptcha();
  }
  if (isExist($(".comment-page"))) {
    new Comments(".comment-page", BASE);
  }
  new Cart(BASE);
});
