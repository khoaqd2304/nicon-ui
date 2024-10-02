(function ($) {

    $(document).ready(function () {
       
        if ($('body').hasClass('front')) {
            var path_prefix = '';
            if (Drupal.settings.pathPrefix !== 'fr/') {
                path_prefix = Drupal.settings.pathPrefix;
            }
            $.ajax({
                url: Drupal.settings.basePath+path_prefix+"home_newsroom_info",
                context: document.body
            }).done(function (data) {
                var str_block = '<div class="block block-bouygues-newsroom contextual-links-region no-title even block-count-12 block-region-content block-b-newsroom-home" id="block-bouygues-newsroom-b-newsroom-home">  ';
                var str_block2 = str_block + data + '</div>';
                $('#main-content  #content #block-views-focus-home-slideshow-block-1').after(str_block2);
            });
        }
        
        if ($('body').hasClass('page-group')) {
          $('#main-content a').attr('target','_blank');
        }
        // $("#home-slides img").lazyload();

        $(document).ajaxStart(function () {
            /*$('#cboxNext').hide();
             $('#cboxPrevious').hide();
             if ($('#cboxLoadedContent article').hasClass('node-lang-en')) {
             $('#cboxClose').text('Close ');
             }*/

            $('.scroll-top').hide();

        });
//    $(document).ajaxComplete(function(){
//        $('#cboxPrevious').show();
//        $('#cboxNext').show();
//    });
        $(document).ajaxComplete(function () {
            /*$('#cboxNext').show();
             $('#cboxPrevious').show();
             if ($('#cboxLoadedContent article').hasClass('node-lang-en')) {
             $('#cboxClose').text('Close ');
             }*/
            $('.scroll-top').hide();
        });

        if ($('body').hasClass('page-presse-mediatheque') || $('body').hasClass('page-press-media-library')) {
            var url = window.location.href;
            if ((url).indexOf('#!') != -1) {
                var value = (url.split('#!'))[1];
                $('.' + value).trigger("click");
            }
        }

        var width = $(window).width();
        if (width > 1024) {
            $(".view-content .node-content a.lightbox-processed").click(function (e) {

                var url = window.location.href;
                if ((url).indexOf('#!') != -1) {
                    var url = (url.split('#!'))[0];
                }
                var title = $(this).attr('title');
                title = title.replace(/\ /g, '_');
                url = url + '#!' + title;
                window.history.pushState('', '', url);
            });
        }

        $("#bottomNavClose").click(function (e) {

            var url = window.location.href;
            if ((url).indexOf('#!') != -1) {
                var url = (url.split('#!'))[0];
            }
            window.history.pushState('', '', url);
        });

        /* ============================= */
        /*          STRUCTURE            */
        /* ============================= */
        /* Déclaration des variables */
        var max_rub = $(".po_section").length;
        var vitesse_base = 150;
        var index_scroll = 0;
        var rub_active = 0;
        var rub_actuelle = 0;
        
        /* ============================= */
        /*            SCR0LL             */
        /* ============================= */
        $(window).scroll(function(){            
            /* STRUCTURE */
            /* Init ancien_index */
            var ancien_index = index_scroll;
            $(".section").removeClass("po_active2");
            /* Détection de la rubrique visible à l'écran + init du nouvel index_scroll*/
            for (var i = 1; i <= max_rub; i++)    {
                var offset = $(".po_section"+i).offset();
                if ( $(window).scrollTop() >= offset.top - 500  ) {
                    $(".po_section"+i).addClass("po_active2");
                    index_scroll  = i;
                } else {
                    $(".po_section"+i).removeClass("po_active2");
                }
            }
            /* Si une nouvelle rubrique est apparue : */
            if ( ancien_index !== index_scroll ) {
                /* Init rub_active */
                rub_active = index_scroll;
                /* Activation de la rubrique active */
                $(".po_section").removeClass("po_active");
                $(".po_section"+rub_active).addClass("po_active");  
            }  /* END if ( ancien_index !== index_scroll ) */
        }); /* END $(window).scroll() */
        $('.po_section1').addClass('po_active');

        $('.page-node-1068 .block-boutons-map-list .items a, .page-node-1069 .block-boutons-map-list .items a').off('click').on('click',function(e) {
            $('.page-node-1068 .block-boutons-map-list .items a, .page-node-1069 .block-boutons-map-list .items a').removeClass('select');
            $('#block-bouygues-pages-carte-implantation').removeClass("sMOff sMOn");
            $('#block-bouygues-pages-liste-implantation-mobile').removeClass("sMOff sMOn");
            if($(this).hasClass("map")) {
                $('#block-bouygues-pages-carte-implantation').addClass("sMOn");
                $('#block-bouygues-pages-liste-implantation-mobile').addClass("sMOff");
            } else if($(this).hasClass("list")) {
                $('#block-bouygues-pages-carte-implantation').addClass("sMOff");
                $('#block-bouygues-pages-liste-implantation-mobile').addClass("sMOn");
            }
            $(this).addClass('select');
        });
        $('.page-node-1068 .block-boutons-map-list .items a:first-child, .page-node-1069 .block-boutons-map-list .items a:first-child').trigger('click');
        
        $('.node-projet .body-left-proj .field-name-field-lien-projet a').text('VOIR LA FICHE PROJET');

    });

    //If loaded in iframe
    $(window).load(function () {

        $('.navi').css('display', 'block');
        $('.flex-border-img').css('display', 'block');

        $('#diapo_popin_emblematique .flexslider-controls').css('display', 'block');

        if (top !== self) {
            //Communicate dimensions to parent
            top.Drupal.behaviors.bouygues.frameDimensions(self);

            //Attempt to disable admin menu
            delete self.Drupal.behaviors.adminMenu;

            //Iframe closing elements
            $('.close-frame').click(top.Drupal.behaviors.bouygues.closeFrame);
            $('.boutton-terminer').click(top.Drupal.behaviors.bouygues.closeFrame);
            $('#edit-delete').click(top.Drupal.behaviors.bouygues.closeFrame);

        } else {
            $('.formulaire-aboonnement').addClass('responsive-aboonnement');
            $('.page-node-done').addClass('responsive-aboonnement');
            if ($('body').hasClass('formulaire-aboonnement')) {
                var from = document.referrer;
                $('#edit-delete').click(function (e) {
                    location.href = from;
                    return false;
                });
            }
        }


        $('.page-presse-mediatheque .form-radio').uniform();
        $('#uniform-edit-field-th-me-tid-1414').closest('.form-item').addClass('clear-left-radio');
        $('.page-presse-mediatheque .form-radios').uniform();
        $('#uniform-edit-field-th-me-tid-1449').closest('.form-item').addClass('clear-left-radio');

        $('.page-node-9915')
        $('.nivoSlider').nivoSlider({controlNav: false, effect:'slideInLeft', animSpeed: 250});
    });

    //Initial iframe height
    window.cFrameHeight = 0;

    Drupal.behaviors.bouygues = {
        selectBoxReplace: function (items, context) {
            if ($(items, context).length) {
                var scontainer = $('<div class="dropdown"></div>')
                var oselector = $('<div class="divscroller"></div>');
                var option = $('<div class="sel"></div>');
                var oselected = $('<div class="dropdown-selected"></div>')
                scontainer.append(oselected);
                scontainer.append(oselector);

                //Define routine for retroactiveness (change on divbox must reflect independent change on select)
                var changeRoutine = function () {
                    var instanceContainer, optionsContainer;

                    instanceContainer = $('.dropdown', this.parentNode);
                    $('.dropdown-selected', instanceContainer).html($(this).find('option:selected').html());
                    optionsContainer = $('.divscroller', instanceContainer).empty();

                    //Add options
                    $('option', this).each(function () {
                        $this = $(this);
                        one_option = $(option).clone().html($this.html()).attr('rel', $this.val());

                        if ($this.val() == $this.parent().find(':selected').val()) {
                            one_option.addClass('selected');
                        }

                        optionsContainer.append(one_option);
                    });

                    optionsContainer.hide();
                };

                //Form div structure for the select
                $(items, context).each(function () {
                    var id_name = 'divscroller-select-';
                    var id = 0;

                    $select = $(this);

                    if ($select.hasClass('divscroller-processed')) {
                        return;
                    }
                    else {
                        $select.addClass('divscroller-processed');
                    }

                    //Create elements
                    instanceContainer = $(scontainer).clone().appendTo(this.parentNode);

                    //Make sure select has a unique ID
                    if ($select.attr('id')) {
                        id_name = $select.attr('id');
                    }
                    else {
                        while ($('#divscroller-select-' + id).length > 0) {
                            id++
                        }
                        id_name = 'divscroller-select-' + id;

                        $select.attr('id', id_name);
                    }
                    $('.divscroller', instanceContainer).attr('rel', id_name);

                    changeRoutine.apply(this);

                    //Hide the select box
                    $select.hide().change(changeRoutine);

                    //Add Behaviors
                    $select.siblings('.dropdown').bind('click', function (e) {
                        var target;

                        target = $(e.target);
                        if (target.hasClass('dropdown-selected')) {
                            $('.dropdown-selected', context).not(target).removeClass('open').siblings('.divscroller').hide();
                            $('.divscroller', this).toggle();
                            target.toggleClass('open');
                        }
                        if (target.hasClass('sel')) {
                            val = target.attr('rel');
                            field = target.parent().attr('rel');
                            target.parent().fadeOut().siblings('.dropdown-selected').html(target.html()).removeClass('open');
                            $('#' + field).val(val).trigger('change');

                            //target.siblings().removeClass('selected').end().addClass('selected');
                        }
                    });

                    //Select options hover
                    $('.sel', context).hover(function () {
                        $(this).addClass('hover');
                    }, function () {
                        $(this).removeClass('hover');
                    });
                });
            }
        },
        attach: function (context, settings) {
            //block clickable
            // var student_block_link = $('.section-student .views-field views-field-nothing .field-content a').attr('href');
//var student_block_link = $('.section-student .home-profil-temps-forts .field-content > a').attr('href');
            // $('div.view-id-temps_forts .views-field-field-bloc-texte').css('cursor','pointer');
            //$('div.view-id-temps_forts').click(function(){
            //    location.href=student_block_link;
            //});	

            var link = $('.postulez .lien a').attr('href');
            $('div.postulez_click').css('cursor', 'pointer');
            $('div.postulez_click').click(function () {
                location.href = link;
            });


            /*var text_bloc = $('.node-type-home-profil .home-profil-temps-forts .views-field-field-bloc-texte p');
             text_bloc.text(text_bloc.text().substr(0, 64)+'...');*/
            // remove A from block- profile
            /*var val = $('.home-profil-temps-forts .views-field-field-lieu .field-content').html();
             if(val != null){
             $(".home-profil-temps-forts .views-field-field-lieu .field-content").html(val.substring(1, val.length));
             }*/

            $(".page-temps-forts .field-type-taxonomy-term-reference .field-items").each(function () {
                $(this).find('.field-item:last').addClass('last_div');
            });

            var link1 = '';
            if ($('body.front').length > 0) {
                link1 = $('#block-views-temps-forts-block-1 .views-field-nothing a').attr('href');
            }
            else {
                link1 = $('.home-profil-temps-forts .views-field-nothing a').attr('href');
            }
            if (link1 != null) {
                var whole = link1.slice(-9);
                var num = whole.charAt(0);
                var yr = link1.slice(-8);

                var lan = ($('html').attr('lang'));
                var path = location.protocol + "//" + location.host;
                //var tmfr = $('.the_a a').attr('href');

                switch (lan) {
                    case 'fr':
                        if (num == '2') {
                            $('.the_a a').attr('href', path + '/etudiant/temps-forts');
                        }
                        else if (num == '3') {
                            $('.the_a a').attr('href', path + '/jeune-diplome/temps-forts');
                        }
                        else if (num == '4') {
                            $('.the_a a').attr('href', path + '/experimente/temps-forts');
                        }
                        else if (num == '7') {
                            $('.the_a a').attr('href', path + '/jeune-diplome/temps-forts');
                        }
                        break;
                    case 'en':
                        if (num == '2') {
                            $('.the_a a').attr('href', path + '/en/student/events');
                        }
                        else if (num == '3') {
                            $('.the_a a').attr('href', path + '/en/recent-graduate/events');
                        }
                        else if (num == '4') {
                            $('.the_a a').attr('href', path + '/en/experienced/events');
                        }
                        else if (num == '7') {
                            $('.the_a a').attr('href', path + '/en/student/events');
                        }
                        break;
                    default:
                        break;
                }
            }

            //REPLACE ALLLLLL THE SELECTS (for now)
            Drupal.behaviors.bouygues.selectBoxReplace('select', document);

            //Submit all forms on enter key press
            Drupal.behaviors.bouygues.formSubmitOnEnter('form', document);
            var url = window.location.href;
            if ((url).indexOf('organisation-supports-performance') != -1 || (url).indexOf('une-organisation-au-service-de-la-performance') != -1) {
                if ((url).indexOf('#!') != -1) {
                    var value = (url.split('#!'))[1];
                    open_frame(value);
                }
            }
            function open_frame(value) {
                $('.scroll-top').hide();
                var overlay, overlayContent, iframeStuff, closeFrame, _this;

                _this = $("." + value);
                overlay = $('<div class="high-overlay overlay-darkness"></div>');
                overlayContent = $('<div class="high-overlay overlay-content"></div>');
                closeFrame = $('<div class="close-me">' + settings.locale.close + '</div>')

                //Not an iframe from our site
                if (_this.hasClass('popout-frame') && typeof (settings[_this.attr('rel')]) != 'undefined') {
                    iframeStuff = $('<div class="frame-container"></div>').html(settings[_this.attr('rel')]);
                    overlayContent.addClass('outer-frame');
                }
                else {
                    iframeStuff = $('<iframe id="bouygues-frame" src="' + _this.attr('href') + '" width="618"/>');
                }

                overlayContent.append(closeFrame).append(iframeStuff);

                $(document.body).append(overlay).append(overlayContent);
                overlay.fadeIn();
                overlayContent.fadeIn();

                //Add closure behavior
                overlay.add(closeFrame).click(Drupal.behaviors.bouygues.closeFrame);
                return false;
            }
            //Iframe links 
            var frame_links = $('a.pop-frame, a.popout-frame', context);
            if (frame_links.length) {
                frame_links.click(function (e) {
                    var classes = this.classList;
                    var url = window.location.href;
                    if ((url).indexOf('organisation-supports-performance') != -1 || (url).indexOf('une-organisation-au-service-de-la-performance') != -1) {
                        if ((url).indexOf('#!') != -1) {
                            var url = (url.split('#!'))[0];
                        }
                        url = url + '#!' + classes[2];
                        window.history.pushState('', '', url);
                    }
                    $('.scroll-top').hide();
                    var overlay, overlayContent, iframeStuff, closeFrame, _this;

                    _this = $(this);
                    overlay = $('<div class="high-overlay overlay-darkness"></div>');
                    overlayContent = $('<div class="high-overlay overlay-content"></div>');
                    closeFrame = $('<div class="close-me">' + settings.locale.close + '</div>')

                    //Not an iframe from our site
                    if (_this.hasClass('popout-frame') && typeof (settings[_this.attr('rel')]) != 'undefined') {
                        iframeStuff = $('<div class="frame-container"></div>').html(settings[_this.attr('rel')]);
                        overlayContent.addClass('outer-frame');
                    }
                    else {
                        iframeStuff = $('<iframe id="bouygues-frame" src="' + _this.attr('href') + '" width="618"/>');
                    }

                    overlayContent.append(closeFrame).append(iframeStuff);

                    $(document.body).append(overlay).append(overlayContent);
                    overlay.fadeIn();
                    overlayContent.fadeIn();

                    //Add closure behavior
                    overlay.add(closeFrame).click(Drupal.behaviors.bouygues.closeFrame);

                    e.preventDefault();
                    return false;
                });
            }
        },
        frameDimensions: function (frameWindow) {
            //Set our container's height to auto so we can gather correct inner height             $('#bouygues-frame').css('height', 'auto');

            //Set iframe height
            window.cFrameHeight = $(frameWindow.document).height();
            $('#bouygues-frame').css('height', window.cFrameHeight);

            //Calc overlay content placement
            Drupal.behaviors.bouygues.oRecalc();
            $(window)
                    .unbind('resize')
                    .bind('resize', Drupal.behaviors.bouygues.oRecalc);
        },
        //Recalcs overlay content's top placement
        oRecalc: function () {
            if (window.cFrameHeight != 0) {
                var overlayContent, winHeight;
                overlayContent = $(document.body).children('.high-overlay.overlay-content');

                winHeight = $(window).height();

                if (winHeight < window.cFrameHeight) {
                    overlayContent.css({top: -20});
                }
                else {
                    overlayContent.css({top: ((winHeight - window.cFrameHeight) / 2)
                    });
                }
            }
        },
        closeFrame: function () {
            var url = window.location.href;
            if ((url).indexOf('#!') != -1) {
                var url = (url.split('#!'))[0];
            }
            window.history.pushState('', '', url);
            window.cFrameHeight = 0;
            $(window).unbind('resize', Drupal.behaviors.bouygues.oRecalc);
            var frameWorks;
            frameWorks = $(document.body).children('.high-overlay');

            $('.scroll-top').show();

            frameWorks.fadeOut('slow', function () {
                frameWorks.remove();
            });
        },
        formSubmitOnEnter: function (items, context) {
            var form_elem = $(items, context);
            if (form_elem.length) {
                $('input[type=text]', form_elem).keypress(
                        function (e) {
                            if (e.which == 13) {
                                form_elem.submit();
                            }
                        }
                )
            }
        }
    }
    
  /*
   * pour la page Communiqués de presse
   */
  if(($('body').hasClass('page-communiques-de-presse')) || $('body').hasClass('liste-contenu-presse')){
     $( "#views-exposed-form-communiqu-de-presse-page select,#views-exposed-form-communiqu-de-presse-page-1 select" ).change(function(){
        $( "#edit-submit-communiqu-de-presse" ).trigger("click" );
     });
     $( "#views-exposed-form-dossiers-de-presse-page select,#views-exposed-form-dossiers-de-presse-page-1 select" ).change(function(){
        $( "#edit-submit-dossiers-de-presse" ).trigger("click" );
     });
     $( "#views-exposed-form-actualit-s-page select,#views-exposed-form-actualit-s-page-1 select" ).change(function(){
        $( "#edit-submit-actualit-s" ).trigger("click" );
     });     
  }
    /*
     * pour la page nos realisations
     */    

    if($('body').hasClass('page-nos-realisations')){
		if (getParameterByName('mapshow') !== null)
			{showMap();}        

        $('.items .map').click(function (e) {      
            e.preventDefault();

			if (getParameterByName('mapshow') === null)
				{window.location.href = addUrlParameter('mapshow');}
			else
				{showMap();}
        });

        $('.items .list').click(function (e) {
            $('.page-nos-realisations .block-b-map-projet').css('display','none');
            $(this).addClass('select');
            $('.items .map').removeClass('select');
            $('.block-page-nos-realisations-new').removeClass('hide');
            $('.listmap').removeClass('hide');
            e.preventDefault();
        });
        
        
    
        $("#refresh_but").click(function(e) {
            e.preventDefault();
            // fr
            window.location.href = 'realisations#block-bouygues-pages-b-map-region-choose-proj';
         });
    }

	function showMap() {
		$('.listmap').addClass('hide');
		$('.page-nos-realisations .block-b-map-projet').css('display','block');
		$('.items .map').addClass('select');
		$('.items .list').removeClass('select');
	}
})(jQuery);

(function ($) {
    Drupal.behaviors.contact = {
        attach: function (context, settings) {
            //block clickable
            var link = $('.postulez .lien a').attr('href');
            $('div.postulez_click').css('cursor', 'pointer');
            $('div.postulez_click').click(function () {
                location.href = link;
            });

            var bm = '<li class=custom>' + $(".bottom-menus").html() + '</li>';
            $(bm).insertAfter("#block-system-main>ul>li.last");

            $("#block-system-main>ul>li.custom>ul.menu").hide();
            $("#block-system-main>div.bottom-menus").hide();
            /*
             $("#block-system-main>ul>li.custom>ul>li.first").css({"margin":"10px 0 -25px 0"});
             $("#block-system-main>ul>li.custom>ul>li.first>a").css({"padding-top":"5px"});
             $("#block-system-main>ul>li.custom>ul>li.last").css("margin", "0px 0 -25px 0");*/


            // $('#edit-submitted-resume-upload span.action').text('Browse');
            // $('.dropdown-selected').uniform();
            $('#edit-submitted-resume-upload').uniform();
            $('.form-managed-file #uniform-edit-submitted-resume-upload input.form-file').change(function () {
                $('#edit-submitted-resume-upload-button').mousedown();
            });
            $('.action').text('Browse');
            var txt_message;
            txt_message = $('#edit-submitted-votre-message', context);

            if ($("#webform-client-form-28").is("form") || $("#webform-client-form-124").is("form"))
            {
                if (txt_message.length) {

                    if (txt_message.val() != '') {
                        $("#webform-component-votre-message label").css("display", "none");
                    }

                    txt_message.focus(function () {

                        $("#webform-component-votre-message label").css("display", "none");

                    });

                    txt_message.blur(function () {
                        if ($(this).val() == '') {

                            $("#webform-component-votre-message label").css("display", "block");
                        }

                    });
                }
            }

        }
    };
})(jQuery);

(function ($) {
    Drupal.behaviors.scroll = {
        attach: function (context, settings) {

            $('a#bottomNavClose').click(function () {
                $('.scroll-top').show();
            });


            if ($(".scroll-top").is("a"))
            {

                $('a.scroll-top').click(function () {

                    $('html,body').animate({scrollTop: 0}, 'slow');
                    return false;
                });

                $(window).scroll(function () {
                    if ($(window).scrollTop() < 250) {
                        $('.scroll-top').stop().animate({'opacity': 0}, function () {
                            $(this).hide();
                        });
                    } else {
                        $('.scroll-top').stop().animate({'opacity': 1}, function () {
                            if (!$(".high-overlay").is("div") && $('#lightbox').css('display') == 'none') {
                                $(this).show();
                            }
                        });
                    }
                });



            }

        }
    };
})(jQuery);

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function autoResize(id) {
    var newheight;
    var newwidth;

    if (document.getElementById) {
        newheight = document.getElementById(id).contentWindow.document.body.scrollHeight;
        newwidth = document.getElementById(id).contentWindow.document.body.scrollWidth;
    }

    document.getElementById(id).height = (newheight) + "px";
    document.getElementById(id).width = (newwidth) + "px";
}
/*
 function getArgs() {
 var args = new Object();
 var query = location.search.substring(1);
 var pairs = query.split("&");
 for (var i=0;i<pairs.length;i++) {
 var pos = pairs[i].indexOf('=');
 if (pos == -1) continue;
 var argname = pairs[i].substring(0,pos);
 var value = pairs[i].substring(pos+1);
 args[argname] = unescape(value);
 }
 return args;
 }
 */
/*function onChangeIFrame(args)
 {
 var iframe = document.getElementById('Iframe');
 var args = getArgs();
 iframe.height = args.Height;
 window.scrollTo(0, 0);
 }*/
function onChangeIFrame(args)
{
    var iframe = document.getElementById('Iframe');
    iframe.height = args.Height;
    window.scrollTo(0, 0);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function addUrlParameter(name, value, url) {
	if (
		typeof name != 'undefined' && typeof value != 'undefined'
		|| name !== '' && value !== ''
	) {
		if (typeof url == 'undefined') {url = window.location.href}

		var paramPrefix = '',
		paramSuffix = '',
		equalsValue = typeof value == 'undefined' ? '': '=' + value;

		if (/\?.+/.test(url))
			{paramPrefix += '&';}
		else if (!/\?/.test(url))
			{paramPrefix += '?';}

		if (window.location.hash) {
			url = url.replace(new RegExp(window.location.hash + '$'), '');
			paramSuffix = window.location.hash;
		}

		return url + paramPrefix + name + equalsValue + paramSuffix;
	}
}

function changeUrlParameter(name, value, url) {
	if (typeof url == 'undefined') {url = window.location.href}

	var hash = '';
	if (window.location.hash) {
		hash = window.location.hash;
		url = url.replace(new RegExp(window.location.hash + '$'), '');
	}

	if (typeof name != 'undefined') {
		var equalsValue = typeof value == 'undefined' ? '': '=' + value,
		urlParams = url.split('?');

		if (urlParams.length == 2) {
			var insertionStart = 0,
			insertionLength = 0,
			paramValues = urlParams[1].split('&'),
			nameValueSplit;

			for (var i in paramValues) {
				nameValueSplit = paramValues[i].split('=');

				if (nameValueSplit[0] == name) {
					insertionLength = nameValueSplit[0].length;
					if (nameValueSplit.length == 2)
						{insertionLength += 1 + nameValueSplit[1].length;}

					urlParams[1] = urlParams[1].substr(0, insertionStart) + name + equalsValue + urlParams[1].substr(insertionStart + insertionLength);
					
					
					if (typeof value != 'undefined')
						{nameValueSplit[1] = value};
				}

				insertionStart += nameValueSplit[0].length;
				if (nameValueSplit.length == 2)
					{insertionStart += 1 + nameValueSplit[1].length;}

				insertionStart++;
			}

			url = urlParams.join('?');
		}
	}

	return url + hash;
}

/*function iframeLoaded() {
 var iFrameID = document.getElementById('Iframe');
 var iframeresizerheight = document.getElementById('iFrameSizer');
 //var test = iframe.contentWindow.document.body.scrollHeight>iFrameID.contentWindow.document.body.clientHeight;
 alert(iframeresizerheight);
 //if(iFrameID) {
 //iFrameID.height = "";
 // iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
 
 
 // }   
 }*/
