var Start =  ['$location', '$scope', '$timeout', 'localStorageService',function ($location, $scope, $timeout, localStorageService) {
    var p = $location.$$path;
    if (p == '/') {
        $timeout(function() {
            initSlider();
        }, 10);
        $timeout(function() {
            ready();
        }, 300)
    } else if (p == '/downloads') {
        ready();
    } else if (p == '/partner') {
        showPartner();
        ready();
    } else if (p == '/referenzen') {
        $timeout(function() {
            $('.referenzen a').each(function(index, el) {
                var that = $(this);
                $timeout(function() {
                    that.addClass('active')
                }, 100 * index)
            });
        }, 400)
    } else {


        $('.container li').each(function(index, el) {
            console.log($(this).find('a').text())

            $(this).find('p').each(function(index, el) {
                console.log($(this).text())                
            });

        });

        ready();
    }


    $scope.initReferenzen = function(){
        $('body').initReferenzen();
    }

    $scope.initMasonry = function(){
        $('body').initDownload();
        $('.main a').each(function(index, el) {
            $(this).attr('href', $('head base').attr('href') + $(this).attr('href'));
        });
    }

}];