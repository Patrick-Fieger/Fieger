var Thema = ['$scope', '$stateParams', '$location','$rootScope','localStorageService','$timeout',function ($scope, $stateParams, $location,$rootScope,localStorageService,$timeout) {
	var route = $stateParams.news;
	$rootScope.readerLoading = 0;

	$.getJSON('/news/' +localStorageService.get('lang') +'/'+ route + '.json', function(data) {
		$scope.reader = data;
		$timeout(function(){
			$rootScope.readerLoading = 1;
		},1000);
	});
}];