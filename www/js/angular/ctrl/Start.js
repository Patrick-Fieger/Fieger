var Start =  ['$location', '$scope', '$timeout', 'localStorageService',function ($location, $scope, $timeout, localStorageService) {
    var p = $location.$$path;
    if (p == '/partner') {
        showPartner();
    } else if (p == '/referenzen') {
        $timeout(function() {
            $('.referenzen a').each(function(index, el) {
                var that = $(this);
                $timeout(function() {
                    that.addClass('active')
                }, 100 * index)
            });
        }, 400)
    }

    ready();
    
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