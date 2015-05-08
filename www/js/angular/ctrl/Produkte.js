var Produkte = ['$scope',function ($scope) {
	$scope.toggleInfo = function(){
		$('.info_wrapper').slideDown(300);
		$('body,html').animate({scrollTop: 0}, 300,'easeInOutExpo')
	}
	$scope.closeInfo = function(){
		$('.info_wrapper').slideUp(300);
	}

	addClassForEachElement('.compare_item');
}]