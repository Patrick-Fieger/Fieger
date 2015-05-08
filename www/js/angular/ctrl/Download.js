var Downloads = ['$scope','$stateParams',function ($scope,$stateParams) {
	$scope.initMasonry = function(){
        var $container = $('.main').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
            filter : '.flw_40.zeichnungen'
        });

        var viewEmpty = false;
        $container.isotope('on','layoutComplete',function(){
            setTimeout(function(){
                $('.element-item').each(function(index, el) {
                    var hidden = $(this).is(':visible');
                    viewEmpty = false;
                    if(hidden){
                        viewEmpty = true;
                        return false;
                    }
                }).promise().done(function(){
                    if(!viewEmpty){
                        $('.noitemdownload').addClass('active');
                    }else{
                        $('.noitemdownload').removeClass('active');
                    }

                });
            },500);
        });

        var filters = {};
        $(document).on('change', '.select_filter select', function() {
            var filterGroup = $(this).attr('data-filter-group');
            filters[filterGroup] = $(this).find(':selected').data('filter');
            var filterValue = '';
            for (var prop in filters) {
                filterValue += filters[prop];
            }
            $container.isotope({
                filter: filterValue
            });
        });

        $('.element-item').each(function(index, el) {
            $(this).attr('title', $(this).find('p').eq(0).text());
        });
        setTimeout(function(){
            $('.select_filter').find('select').eq(0).val($('.select_filter').find('select').eq(0).val());
            var param = $stateParams.system;
            var rep = param.replace('-','/')
            var states = ['FLW40','FLW24/28','FGL']
            if(param !== undefined){
                for (var i = 0; i < states.length; i++) {
                    if(states[i] == rep){
                        console.log('param')
                        $('.select_filter').find('select').eq(0).val(rep);
                        $('.select_filter select').trigger('change');
                    }
                };
            }

            $('.select_filter select').trigger('change');
        },400);
	}





    
}]


