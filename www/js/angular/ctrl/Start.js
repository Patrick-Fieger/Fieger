var Start =  ['$location', '$scope', '$timeout', 'localStorageService',function ($location, $scope, $timeout, localStorageService) {
    var p = $location.$$path;
    
    if (p == '/partner') {
        showPartner();
    } else if (p == '/referenzen') {
        addClassForEachElement('.referenzen a');
    } else if (p == '/produkte'){
        addClassForEachElement('.compare_item');
    } else if (p == '/kontakt'){
        addClassForEachElement('.conBox');
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

    ready();
}];