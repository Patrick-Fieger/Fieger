var Index = ['$scope', '$stateParams', '$location','$rootScope','localStorageService',function ($scope, $stateParams, $location,$rootScope,localStorageService) {
	
	function setHeights(){
		$('.home_big,.img_window').height($(window).height() - 138);
		$('.margewrapper').css('margin',((($(window).height() - 138) - $('.margewrapper').height())/2) - 40 + 'px 0px');
	}

	function initAnimation(class_,time){
		setTimeout(function(){
			$(class_).addClass('active');
		},time);
	};

	initAnimation('.img_window',750);
	initAnimation('.margewrapper h1',1200);
	initAnimation('.margewrapper h2',1400);
	initAnimation('.margewrapper button',1600);
	setHeights();
	$(window).resize(setHeights());
	$scope.showMoreInfos = function(){
		$location.path('/lamellenfenster');
	}



}];