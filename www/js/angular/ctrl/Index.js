var Index = ['$scope', '$stateParams', '$location','$rootScope','localStorageService',function ($scope, $stateParams, $location,$rootScope,localStorageService) {
	
	function setHeights(){
		$('.home_big,.img_window').height($(window).height() - 138);
		$('.margewrapper').css('margin',((($(window).height() - 138) - $('.margewrapper').height())/2) - 40 + 'px 0px');
	}

	function initAnimation(class_,time){
		setTimeout(function(){
			$('.'+ class_).addClass('active');
		},time);
	};

	initAnimation('img_window',750);
	initAnimation('margewrapper h1',1200);
	initAnimation('margewrapper h2',1400);
	initAnimation('margewrapper button',1600);
	setHeights();
	$(window).resize(setHeights());


	// $(window).scroll(function(event) {
	// var scrolltop=$(window).scrollTop();
	// var indexcalc;
	//     if(scrolltop<=$(window).height()){
	//         indexcalc= (scrolltop/($(window).height()+10))*100 +'px';
	//         console.log(indexcalc)
	//           $('.home_big').css({
	//             'background-position-y': indexcalc
	//           });
	//     }
	// });

	$scope.showMoreInfos = function(){
		$('html,body').animate({scrollTop: $('#moreinfo').offset().top - 63}, 750,'easeInOutExpo');
	}



}];