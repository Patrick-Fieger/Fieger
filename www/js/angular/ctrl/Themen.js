var Themen = ['$scope', '$stateParams', '$location','$rootScope','localStorageService','$timeout',function ($scope, $stateParams, $location,$rootScope,localStorageService,$timeout) {
	$timeout(function(){addClassForEachElement('.selectorClass');},100)
	ready();
}];