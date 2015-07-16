var Downloads = ['$scope','$stateParams','$location',function ($scope,$stateParams,$location) {
	
    $scope.t = $location.search().type;
    $scope.c = $location.search().category;

    $scope.filters = $scope.t + $scope.c

    $scope.initMasonry = function(){
        $('.iso a').each(function(index, el) {
            if($(this).attr('href').split('.').pop() !== 'pdf'){
                $(this).attr('download','');
            }else{
                $(this).attr('target','_blank')
            }       
        });

        var $container = $('.iso').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
            filter : $scope.filters
        });

        $scope.changeFilter = function($event){
            if($event.target.dataset.filterGroup == 'type'){
                $scope.t = $event.target.dataset.filter
            }else{
                $scope.c = $event.target.dataset.filter
            }
            $scope.filters = $scope.t + $scope.c;
            $location.search('type',$scope.t)
            $location.search('category',$scope.c)
            $container.isotope({
                filter: $scope.filters
            });

            $scope.addActiveClass();
        }

        $scope.addActiveClass = function(){
            $('.download_menu a').removeClass('active')
            $('.download_menu a').each(function(){
                var d = $(this).data('filter')
                if(d == $scope.t || d == $scope.c){
                    $(this).addClass('active')
                }
            });
        }

        $('.element-item').each(function(index, el) {
            $(this).attr('title', $(this).find('p').eq(0).text());
        });

        $scope.addActiveClass();
	}
}]