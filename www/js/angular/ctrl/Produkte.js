var Produkte = ['$scope','$rootScope',function ($scope,$rootScope) {
	$scope.toggleInfo = function(system){
		$scope.heading = $rootScope.d.Produkte[system].info.heading;
		$scope.paragraphs = $rootScope.d.Produkte[system].info.text;
		setTimeout(function(){
			$('.info_wrapper').slideDown(300);
			$('body,html').animate({scrollTop: 0}, 300,'easeInOutExpo');
		},100)

	}
	$scope.closeInfo = function(){
		$('.info_wrapper').slideUp(300);
	}

	addClassForEachElement('.compare_item');
}]