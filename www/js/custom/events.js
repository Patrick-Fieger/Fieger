var base=$('head base').attr('href');
$(window).scroll(function(event) {
    var scroll = $(this).scrollTop();
    if (scroll >= 87) {
        $('.nav_wrapper,.scrolltop,[stickyunder],.compare_menu').addClass('sticky');
    } else {
        $('.nav_wrapper,.scrolltop,[stickyunder],.compare_menu').removeClass('sticky');
    }

    if(scroll >= 400){
        $('.compare_menu').addClass('sticky');
    }else{
        $('.compare_menu').removeClass('sticky');
    }

});
$(document).on('click', '.faq a', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $(this).next('.inner_info').toggle();
});
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
$(document).on('keyup', '.faq input', function(event) {
    var filter = $(this).val();
    $('.faq li,.faq li a').hide();
    $('.faq .inner_info p:contains("' + filter + '"),.faq .inner_info a:contains("' + filter + '")').closest('li').show();
    $('.faq .inner_info p:contains("' + filter + '")').closest('li').find('a').show();
    $('.faq .inner_info a:contains("' + filter + '")').show();
    $('.faq li p,.faq li a').unhighlight();
    $('.faq li p,.faq li a').highlight(filter);
    var highlightcounter = $('.faq').find('.highlight').size();
    if(highlightcounter === 0){
        $('.faq h1,.faq ul,.faq_not_found').addClass('not_found');
    }else{
        $('.faq h1,.faq ul,.faq_not_found').removeClass('not_found');
    }

    if(filter === ""){
        $('.faq h1,.faq ul,.faq_not_found').removeClass('not_found');
    }
});

$(document).on('click', 'a[href="#"]', function(event) {
    event.preventDefault();
});

$(document).on('click', '.breadcrumb a', function(event) {
    $('.breadcrumb a').removeClass('active');
    $(this).addClass('active');
});
$(document).on('click', '.nav_wrapper a', function(event) {
    $('.nav_wrapper a').removeClass('active');
    $(this).addClass('active');
    if ($(this).text() == "Systeme") {
        $('.breadcrumb').addClass('active');
    } else {
        $('.breadcrumb').removeClass('active');
    }
});
$(document).on('click', '.region_choose li,.region_hor li', function(event) {
    event.preventDefault();
    $('.region_choose li,.region_hor li').removeClass('active');
    $(this).addClass('active');
    // $('body').showCards($(this).text())
});
$(document).on('click', '.headings_l a', function() {
    event.preventDefault();
    if (!$(this).hasClass('active_')) {
        $('.headings_l ul').hide();
        $(this).next('ul').show();
        $('.description p').removeClass('active');
        $('.product_info').addClass('active');
        $('.headings_l a').removeClass('active_');
        $('.description').hide();
        $(this).addClass('active_');
        $('.info_l_section').addClass('left');
        $('.system_choose .selectorClass').addClass('inactive');
    }
});
$(document).on('click', '.opensub', function() {
    event.preventDefault();
    $(this).toggleClass('active');
    $(this).next('ul').slideToggle(200);
});
$(document).on('click', '.indicator div', function(e) {
    $('.reader_slider img,.indicator div').removeClass('active');
    $(this).addClass('active');
    $('.reader_slider').find('img').eq($(this).index()).addClass('active');
});

$(document).on('click', '.close_reader', function(e) {
    $('.reader_bg').trigger('click');
});

$(document).on('click', '.md-close', function() {
    $('.md-overlay,.md-modal').removeClass('active');
    $('body').find('.error_').eq(0).trigger('focus');
});


$.fn.initReferenzen = function(){
    var $container = $('.referenzen').isotope({
            itemSelector: '.gallery',
            layoutMode: 'fitRows',
            animationEngine:'css'
    });

    initFancy();

    $(document).on('click', '.ref_change a', function() {
            $('.ref_change a').removeClass('active');
            $(this).addClass('active');

            $container.isotope({
                filter: $(this).data('filter')
            });
    });
};

$.fn.showCards = function(cards) {
    // $('div[land],#contact_box').removeClass('active')
    // $('div[land="' + cards + '"]').addClass('active');
    // $('div[land="' + cards + '"] #contact_box').each(function(index) {
    //     var that = $(this);
    //     setTimeout(function() {
    //         that.addClass('active');
    //     }, 150 * index)
    // });
};
$.fn.initDownload = function() {
        var $container = $('.main').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows'
        });

        var viewEmpty = false;
        $container.isotope('on','layoutComplete',function(){
            setTimeout(function(){
                $('.element-item').each(function(index, el) {
                    var hidden = $(this).is(':visible');
                    viewEmpty = false;
                    if(hidden){
                        viewEmpty = true;
                        return false;
                    }
                }).promise().done(function(){
                    if(!viewEmpty){
                        $('.noitemdownload').addClass('active');
                    }else{
                        $('.noitemdownload').removeClass('active');
                    }
                });
            },500);
        });

        var filters = {};
        $(document).on('change', '.select_filter select', function() {
            var filterGroup = $(this).attr('data-filter-group');
            filters[filterGroup] = $(this).find(':selected').data('filter');
            var filterValue = '';
            for (var prop in filters) {
                filterValue += filters[prop];
            }
            $container.isotope({
                filter: filterValue
            });
        });
        $(document).on('click', '.resetfilter', function() {
            $('.select_filter select').each(function(index, el) {
                $(this).val($(this).find('option').eq(0).val());
                $('.select_filter select').trigger('change');
            });
        });
        $('.element-item').each(function(index, el) {
            $(this).attr('title', $(this).find('p').eq(0).text());
        });
        setTimeout(function(){
            var ex = localStorage.getItem('download');
            if(ex !== null){
                $('.select_filter').find('select').eq(0).val(ex);
                $('.select_filter select').trigger('change');
                localStorage.removeItem('download');
            }
        },400);
};

var partners = ["AU", "DE", "GB", "AT", "FR", "CH","RU","US","BR","IT","PT","ES","MY","ZA"];

$.fn.selectRegions = function() {
    var mapObj = $('#vmap').vectorMap('get', 'mapObject');
    mapObj.clearSelectedRegions();
    mapObj.setSelectedRegions(partners);
};
var wrld = {
    map: 'world_mill_en',
    backgroundColor: 'transparent',
    zoomOnScroll: false,
    regionStyle: {
        initial: {
            fill: '#ccc'
        },
        hover: {
            "fill": '#ccc',
            "fill-opacity": "1"
        },
        selected: {
            fill: '#f70014'
        },
        selectedHover: {
            fill: '#f70014'
        }
    },
    onRegionClick: function(e,code){
        loadPartners(code);
    },
    onRegionOver: function(e,code){
        checkPointer(code);
    }
};

function loadPartners(c){
    if(partners.indexOf(c) > -1){
        $('div[land]').removeClass('active');
        $('div[land='+c+']').addClass('active');
    }
}

function checkPointer(c){
    if(partners.indexOf(c) > -1){
        $('.jvectormap-container').addClass('active');
    }else{
        $('.jvectormap-container').removeClass('active');
    }
}

$(document).on('click', '.openul', function(){
    $(this).toggleClass('active');
    $(this).next('ol').toggleClass('active');
});

$(document).on('click', '[scrollto]', function(){
    var elem = $(this).attr('scrollto');
    $('html,body').animate({scrollTop: $('#' + elem).offset().top - (66)}, 750, 'easeInOutExpo');
});

$(document).on('click', '[toscroll]', function(event) {
    var scroll = $(this).attr('toscroll');
    setTimeout(function(){
        $('html,body').animate({scrollTop: $('#' + scroll).offset().top - 66}, 750, 'easeInOutExpo');
    },400);
});

$(document).on('click', '[opennews]', function(event) {
    var news = $(this).attr('opennews');
    setTimeout(function(){
        $('[data-load="'+news+'"]').trigger('click');
    },400);
});

$(document).on('click', '.scrolltop', function(){
    $('html,body').animate({scrollTop: 0}, 750, 'easeInOutExpo');
});

$(document).on('click', '.openauswahl', function(){


    if($(this).hasClass('active')){
        $(this).removeClass('active');
        $(this).next('ul').removeClass('active');
    }else{
        $('.openauswahl,.pushy ol ul').removeClass('active');
        $(this).toggleClass('active');
        $(this).next('ul').toggleClass('active');
    }

    
});

$(document).on('click', '[download]', function(){
    var s = $(this).attr('href');
    
    if(s.indexOf("download") > -1){
        localStorage.setItem("download", $(this).attr('download'));
    }

    localStorage.setItem("showback", true);
});



$(document).on('click', '[fromsystem]', function(){
    localStorage.setItem("showback", true);
});

$(window).on("debouncedresize", function(event) {
    $('.container').css('min-height',$(window).height()-100+'px');
});


function showVal(val){
    var video = document.getElementById("video");
    var videoDuration = video.duration;
    video.currentTime = videoDuration / 100 * val;
}

function initFancy(){
    $('.fancybox').unbind('click.fb');
    setTimeout(function(){
        if($('a').hasClass('fancybox'))
            $(".fancybox").fancybox();
    },500);
}

$(document).on('click', '.fancybox', function(e){
    e.preventDefault();
});

/*! Pushy - v0.9.2 - 2014-9-13
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

$(function() {
    var pushy = $('.pushy'), //menu css class
        body = $('body'),
        container = $('.slide'), //container css class
        push = $('.push'), //css class to add pushy capability
        siteOverlay = $('.site-overlay'), //site overlay
        pushyClass = "pushy-left pushy-open", //menu position & menu open class
        pushyActiveClass = "pushy-active", //css class to toggle site overlay
        containerClass = "container-push", //container open class
        pushClass = "push-push", //css class to add pushy capability
        menuBtn = $('.menu-btn, .pushy a'), //css classes to toggle the menu
        menuSpeed = 200, //jQuery fallback menu speed
        menuWidth = pushy.width() + "px"; //jQuery fallback menu width

    function togglePushy(){
        body.toggleClass(pushyActiveClass); //toggle site overlay
        pushy.toggleClass(pushyClass);
        container.toggleClass(containerClass);
        push.toggleClass(pushClass); //css class to add pushy capability
    }

    function openPushyFallback(){
        body.addClass(pushyActiveClass);
        pushy.animate({left: "0px"}, menuSpeed);
        container.animate({left: menuWidth}, menuSpeed);
        push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
    }

    function closePushyFallback(){
        body.removeClass(pushyActiveClass);
        pushy.animate({left: "-" + menuWidth}, menuSpeed);
        container.animate({left: "0px"}, menuSpeed);
        push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
    }

    //checks if 3d transforms are supported removing the modernizr dependency
    cssTransforms3d = (function csstransforms3d(){
        var el = document.createElement('p'),
        supported = false,
        transforms = {
            'webkitTransform':'-webkit-transform',
            'OTransform':'-o-transform',
            'msTransform':'-ms-transform',
            'MozTransform':'-moz-transform',
            'transform':'transform'
        };

        // Add it to the body to get the computed style
        document.body.insertBefore(el, null);

        for(var t in transforms){
            if( el.style[t] !== undefined ){
                el.style[t] = 'translate3d(1px,1px,1px)';
                supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);

        return (supported !== undefined && supported.length > 0 && supported !== "none");
    })();

    if(cssTransforms3d){
        //toggle menu
        menuBtn.click(function(event) {
            togglePushy();
        });
        //close menu when clicking site overlay
        siteOverlay.click(function(){ 
            togglePushy();
        });
    }else{
        //jQuery fallback
        pushy.css({left: "-" + menuWidth}); //hide menu by default
        container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

        //keep track of menu state (open/close)
        var state = true;

        //toggle menu
        menuBtn.click(function() {
            if (state) {
                openPushyFallback();
                state = false;
            } else {
                closePushyFallback();
                state = true;
            }
        });

        //close menu when clicking site overlay
        siteOverlay.click(function(){ 
            if (state) {
                openPushyFallback();
                state = false;
            } else {
                closePushyFallback();
                state = true;
            }
        });
    }
});