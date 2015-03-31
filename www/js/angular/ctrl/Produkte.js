var Produkte = ['$scope',function ($scope) {
	$scope.showInfo = false;

	$scope.showInfos = function(){
		$scope.showInfo = true;
	}

	$scope.closeInfo = function(){
		$scope.showInfo = false;
	}

	addClassForEachElement('.compare_item');
}]


