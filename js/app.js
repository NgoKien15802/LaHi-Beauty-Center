$(document).ready(function () {
    // Active khi click menu
    $(document).on("click", ".menu-main li a", function () {
        $(".menu-main li").removeClass("active");
        $(".menu-main li a").removeClass("active");
    
        $(this).parent("li").addClass("active");
        $(this).addClass("active");
    });

      // Set active menu by route
      setTimeout(function () {
        var currentPath = window.location.pathname;
        console.log("currentPath:", currentPath);
        console.log("count:", $(".menu-main li a").length);
        $(".menu-main li a").each(function () {
            var route = $(this).data("route") || $(this).attr("href");
            if (route === currentPath || (currentPath.startsWith(route) && route !== "/")) {
                $(this).closest("li").addClass("active");
                $(this).addClass("active");
            }
        });
    }, 100);

    // Menu mobile
    $(document).on("click", ".icon_menu_mobi,.close_menu,.menu_baophu,#mmenu_trigger", function () {
        if ($(".menu_mobi_add").hasClass("menu_mobi_active")) {
            $(".menu_mobi_add").removeClass("menu_mobi_active");
            $(".menu_baophu").fadeOut(300);
          } else {
            $(".menu_mobi_add").addClass("menu_mobi_active");
            $(".menu_baophu").fadeIn(300);
          }
          return false;
    });
    
    // Close mobile menu when clicking on a menu link
    $(document).on("click", ".load-menu a", function () {
        $(".menu_mobi_add").removeClass("menu_mobi_active");
        $(".menu_baophu").fadeOut(300);
    });

    // Get mobile service submenu
    var menu_mobi = $("ul.menu_desktop").html();
    $(".load-menu").append("<ul>" + menu_mobi + "</ul>");
    // Add dropdown icon if submenu exists
    $(".load-menu ul li").each(function () {
        if ($(this).find("ul li").length > 0) {
            $(this).children("a").append('<i class="fas fa-chevron-down"></i>');
        }
    });

    // Toggle submenu when clicking on dropdown icon
    $(document).on("click", ".load-menu ul li a i", function (e) {
        e.preventDefault();
        var $a = $(this).parent("a");
        var $submenu = $a.parent("li").find("> div > ul");

        if ($a.hasClass("active2")) {
            $a.removeClass("active2");
            $submenu.slideUp(300);
        } else {
            $(".load-menu ul li a").removeClass("active2");
            $(".load-menu ul li div ul").slideUp(300);
            $a.addClass("active2");
            $submenu.slideDown(300);
        }
        return false;
    });
});