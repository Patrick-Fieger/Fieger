var Index = ['$scope', '$stateParams', '$location','$rootScope','localStorageService',function ($scope, $stateParams, $location,$rootScope,localStorageService) {
	
	function setHeights(){
		$('.home_big').height($(window).height() - 138);
		$('.img_window').height($(window).height() - 198);
		$('.margewrapper').css('margin',((($(window).height() - 138) - $('.margewrapper').height())) - 70 + 'px 30px 0px 0px');
	}

	function initAnimation(class_,time){
		setTimeout(function(){
			$(class_).addClass('active');
			if(class_ == '.img_window'){
				var size = $('.img_window').size() - 1;
				$('.img_window.bg_1').addClass('show_');
				setInterval(function(){
					var index = $('.show_').index()
					
					if(index == size){
						$('.img_window:last-child').removeClass('show_')
						$('.img_window.bg_1').addClass('show_');
					}else{
						$('.show_').removeClass('show_').next('div').addClass('show_')
					}
				},6000)
			}
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