NProgress.configure({
    showSpinner: false
});
var partners = ["AU", "DE", "GB", "AT", "FR", "CH","RU","US","BR","IT","PT","ES","MY","ZA"];
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

function clearsite() {
    $('html,body').scrollTop(0);
    $('.container').removeClass('active').empty();
    $('footer').removeClass('active');
}

function ready() {
    $('header,.container,footer').addClass('active');
}

function showPartner() {
        $('#vmap').vectorMap(wrld);
        $('body').selectRegions();
        var insert = ["Australien", "Großbritanien", "Österreich", "Frankreich", "Portugal", "Schweiz"];
        $.each(insert, function(index, val) {
            var toinsert = $('div[land="Deutschland"]').clone();
            var toinsert_ = toinsert.attr('land', insert[index]).removeClass('active');
            $(toinsert_).insertAfter('div[land]:last-child');
        });
}

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

$(document).on('click', '.nav_wrapper a', function(event) {
    $('.nav_wrapper a').removeClass('active');
    $(this).addClass('active');
    if ($(this).text() == "Systeme") {
        $('.breadcrumb').addClass('active');
    } else {
        $('.breadcrumb').removeClass('active');
    }
});
$(document).on('click', '.region_choose li', function(event) {
    event.preventDefault();
    $('.region_choose li').removeClass('active');
    $(this).addClass('active');
});


$(document).on('click', '.close_reader', function(e) {
    $('.reader_bg').trigger('click');
});

$(document).on('click', '.md-close', function() {
    $('.md-overlay,.md-modal').removeClass('active');
    $('body').find('.error_').eq(0).trigger('focus');
});

$.fn.selectRegions = function() {
    var mapObj = $('#vmap').vectorMap('get', 'mapObject');
    mapObj.clearSelectedRegions();
    mapObj.setSelectedRegions(partners);
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

$(document).on('click', '.scrolltop', function(){
    $('html,body').animate({scrollTop: 0}, 750, 'easeInOutExpo');
});


$(window).on("debouncedresize", function(event) {
    $('.container').css('min-height',$(window).height()-100+'px');
});


function showVal(val){
    console.log(val)
    var video = document.getElementById("video");
    var videoDuration = video.duration;
    video.currentTime = videoDuration / 100 * val;
}

function addClassForEachElement(class_){
    setTimeout(function(){
        $(class_).each(function(index, el) {
            var that = $(this);
            setTimeout(function() {
                that.addClass('active')
            }, 100 * index)
        });
    },400)
}