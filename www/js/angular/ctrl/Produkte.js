var Produkte = ['$scope',function ($scope) {
	$scope.toggleInfo = function(){
		$('.info_wrapper').slideToggle(300);
	}
	addClassForEachElement('.compare_item');
}]