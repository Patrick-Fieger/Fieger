var Themen = ['$scope', '$stateParams', '$location','$rootScope','localStorageService','$timeout',function ($scope, $stateParams, $location,$rootScope,localStorageService,$timeout) {
	var route = $stateParams.news;
	$timeout(function(){addClassForEachElement('.selectorClass');},100)
	if(route == "" || route == undefined){
		$rootScope.readerLoader = 0;
		$rootScope.readerShow = 0;
		$rootScope.reader = "";
	}else {
		$rootScope.loadReader();
		$('body').addClass('hidden');
		console.log(localStorageService.get('lang'))
		console.log('/news/' +localStorageService.get('lang') +'/'+ route + '.json')
		$.getJSON('/news/' +localStorageService.get('lang') +'/'+ route + '.json', function(data) {
			$rootScope.reader = data;
			$timeout(function(){
				$rootScope.showReader();
			},1000);
    	});
	}
	ready();
}];