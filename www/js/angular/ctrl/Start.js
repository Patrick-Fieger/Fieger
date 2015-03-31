var Start =  ['$location', '$scope', '$timeout', 'localStorageService',function ($location, $scope, $timeout, localStorageService) {
    var p = $location.$$path;
    
    if (p == '/partner') {
        showPartner();
    } else if (p == '/referenzen') {
        addClassForEachElement('.referenzen a');
    }else if (p == '/kontakt'){
        addClassForEachElement('.conBox');
    }
    
    $scope.initReferenzen = function(){
        $('body').initReferenzen();
    }

    ready();
}];