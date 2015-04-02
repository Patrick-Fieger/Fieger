var Downloads = ['$scope',function ($scope) {
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
        $(document).on('click', '.resetfilter', function() {
            $('.select_filter select').each(function(index, el) {
                $(this).val($(this).find('option').eq(0).val());
                $('.select_filter select').trigger('change');
            });
        });
        $('.element-item').each(function(index, el) {
            $(this).attr('title', $(this).find('p').eq(0).text());
        });
        setTimeout(function(){
            $('.select_filter').find('select').eq(0).val($('.select_filter').find('select').eq(0).val());
            $('.select_filter select').trigger('change');
        },400);
	}
}]


