var Spezial = ['$scope', '$log', '$location',function ($scope, $log, $location) {
	var sliderwidth;

	$scope.initSlider = function(){
		setSliderWidth();
		$('.slider_mini_wrapper').each(function(index, el) {
			var countimages = $(this).children('div').size();
			$(this).children('div').width(sliderwidth).height(sliderwidth/1.618);
			$(this).width(sliderwidth * countimages);
			$(this).parent('div').after('<div class="indicator_mini"><ul></ul></div>');

			for (var i = 0; i < countimages; i++) {
				$(this).parent('div').next('div').find('ul').append('<div ng-click="slideSlider($event)"></div>');
				if(i == 0){
					$(this).parent('div').next('div').find('div').eq(0).addClass('active');
				}
			};

			$(this).parent('div').next('div').find('ul').width(countimages*20);

		});
	}

	function setSliderWidth(){
		sliderwidth = $('.slider_mini').width();
	}


	$scope.slideSlider = function($event){
		$($event.target).closest('ul').find('div').removeClass('active');
		$($event.target).addClass('active');
		$($event.target).closest('.columns').eq(0).find('.slider_mini').animate({scrollLeft: $($event.target).index() * sliderwidth}, 400, "easeInOutExpo");
	}
}];