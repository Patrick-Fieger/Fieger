var Referenzen = ['$scope','PhotoService',function ($scope,PhotoService) {
	var $container;
	$scope.init = function(){
		$container = $('.referenzen').isotope({
            itemSelector: '.gallery',
            layoutMode: 'fitRows',
            animationEngine:'css'
    	});
    	PhotoService.init('.my-gallery')
	}

	$scope.filter = function($event){
		$('.ref_change a').removeClass('active');
		$($event.target).addClass('active');
		$container.isotope({
		    filter: $($event.target).data('filter')
		});
	}
	addClassForEachElement('.referenzen figure');
}];