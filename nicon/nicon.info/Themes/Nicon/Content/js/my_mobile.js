
(function ($) {
  $(document).ready(function () {
    //Open menu
    $(".open-mobile-menu").click(function (e) {
      e.preventDefault();
      if ($('.open-mobile-menu').hasClass('open')) {
        $(".wrap_menu_links").slideUp("slow");
        $('.open-mobile-menu').removeClass('open');
        $('.menu_overlay').hide();
      } else {
        $(".wrap_menu_links").slideDown("slow");
        $('.open-mobile-menu').addClass('open');
        $('.menu_overlay').show();

      }
    });

    $(".menu_overlay").click(function (e) {
      e.preventDefault();
      $(".wrap_menu_links").slideUp("slow");
      $('.open-mobile-menu').removeClass('open');
      $('.menu_overlay').hide();
    });

    $(".menu-mobile-links ul li.expanded .menu_plus a").click(function (e) {
      e.preventDefault();

      var parentOpen = 0;

      if ($(this).parent().prev().hasClass('link-open')) {
        parentOpen = 1;
      }

      //remove link-open on all menu items 
      $('.link-open').removeClass('link-open');

      // if the parent was open, give the class again.
      if (parentOpen == 1) {
        $(this).parent().prev().addClass('link-open');
      }

      if ($(this).parent().prev().hasClass('link-open')) {
        $(this).parent().next().slideUp("slow");
        $(this).parent().prev().removeClass('link-open');
        $(this).parent().removeClass('link-open');

      } else {
        $(".menu-mobile-links ul li.expanded .menu_plus a").removeClass('link-open');
        $(".menu-mobile-links ul li.expanded ul").hide();
        $(this).parent().next().slideDown("slow");
        $(this).parent().prev().addClass('link-open');
        $(this).parent().addClass('link-open');
      }

    });


    $(".show_search").click(function (e) {
      e.preventDefault();
      $('.wrap_social').removeClass('active');
      $('.show_social').removeClass('active');
      $('.wrap_menu_links').removeClass('social_open');
      if ($(this).hasClass('active')) {
        $('.bloc-mob-droite-2').hide();
        $(this).removeClass('active');
        $('.wrap_menu_links').removeClass('search_open');
      } else {
        $('.bloc-mob-droite-2').show();
        $('.wrap_menu_links').addClass('search_open');
        $(this).addClass('active');
      }
    });

    $(".show_social").click(function (e) {
      e.preventDefault();
      $('.bloc-mob-droite-2').hide();
      $('.show_search').removeClass('active');
      $('.wrap_menu_links').removeClass('search_open');
      if ($(this).hasClass('active')) {
        $('.wrap_social').removeClass('active');
        $(this).removeClass('active');
        $('.wrap_menu_links').removeClass('social_open');
      } else {
        $('.wrap_social').addClass('active');
        $(this).addClass('active');
        $('.wrap_menu_links').addClass('social_open');
      }
    });

    $(".clear_search").hide();
    //$("#edit-search-block-form--2").get(0).type = 'text';
    $('.bloc-mob-droite-2 .form-item-search-block-form').keyup(function () {
      if ($("#edit-search-block-form--2").val() != "") {
        $(".clear_search").show();
      } else {
        $(".clear_search").hide();
      }
    });

    $(".clear_search").click(function (e) {
      e.preventDefault();
      $(this).siblings().find('input').val('');
      //$(".block-search input.form-text").hide();
    });

    /*var txtSearchform = $('#block-search-form input.form-text').val();
     
     $("#block-search-form input.form-text").focus(function()
     {
     if ($(this).val() == txtSearchform)
     {
     $(this).val('');
     }
     });
     
     $("#block-search-form input.form-text").blur(function()
     {
     if ($(this).val() == '')
     {
     $(this).val(txtSearchform);
     }
     });*/

  });
})(jQuery);