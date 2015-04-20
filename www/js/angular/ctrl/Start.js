var Start =  ['$location', '$scope', '$timeout', 'localStorageService',function ($location, $scope, $timeout, localStorageService) {
    var p = $location.$$path;
    
    if (p == '/partner') {
        showPartner();
    }else if (p == '/kontakt'){
        addClassForEachElement('.conBox');
    }

    ready();
}];