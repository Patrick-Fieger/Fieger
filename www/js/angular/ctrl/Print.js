var Print = ['$scope', '$log', '$location',function ($scope, $log, $location) {
	$scope.data = $.parseJSON(localStorage.getItem('calc'));
}];