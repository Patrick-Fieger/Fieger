var Themen = ['$scope', '$stateParams', '$location','$rootScope','localStorageService','$timeout',function ($scope, $stateParams, $location,$rootScope,localStorageService,$timeout) {
	var route = $stateParams.news;
	if(route == "" || route == undefined){
		$rootScope.readerLoader = 0;
		$rootScope.readerShow = 0;	
	}else {
		$rootScope.loadReader();
		$.get('/news/' +localStorageService.get('lang') +'/'+ route + '.json', function(data) {
			$rootScope.reader = data;
			$timeout(function(){
				$rootScope.showReader();
			},1000);
			
    	});
	}
	ready();
}];