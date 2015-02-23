NProgress.configure({
    showSpinner: false
});
var baseURL = "http://localhost/";
var cut = "";
var hash = location.hash;
var url = document.URL;
var slider;

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

function isEmpty(el) {
    return !$.trim(el.html());
}

function initSlider() {
    var slider;
    var random = Math.floor(Math.random() * ($('.bxslider li').size() - 1 + 1));
    $(window).on("debouncedresize", function(event) {
        slider.reloadSlider();
    });
    slider = $('.bxslider').bxSlider({
        mode: 'fade',
        auto: true,
        pause: 6000,
        startSlide: random,
        captions: true
    });
}

function initInput() {

}
$(window).on("debouncedresize", function(event) {
    if ($(window).width() >= 950 && $('.pushy').hasClass('pushy-open')) {
        $('.site-overlay').trigger('click');
    }
});