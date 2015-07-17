var Index = ['$scope', '$stateParams', '$location','$rootScope','localStorageService',function ($scope, $stateParams, $location,$rootScope,localStorageService) {
	
	function setHeights(){
		
		var height = $(window).height() - 150;

		$('.home_big').height(height);
		$('.margewrapper').css('padding-top',height/2 - (133+100)/2).css('height',height-3);
	}

	setTimeout(function(){$('.margewrapper').addClass('active');},1400);
	
	setHeights();
	$(window).resize(setHeights());
	$scope.changePath = function(p){
		console.log(p)

		$location.path(p);
	}
}];