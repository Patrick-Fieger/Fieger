var Simple = ['$scope','$state','ShareService',function ($scope,$state,ShareService) {
    $scope.d = JSON.parse(localStorage.getItem('einzeln'))
    $scope.lamelle = 'Lamelle'

    if($scope.d.anz_choose !== '1'){
        $scope.lamelle = $scope.lamelle + 'n'
    }

    $scope.generate = function(){
    	var data = {
    		type : $state.current.name.replace('/',''),
    		calc : [$scope.d]
    	}
    	ShareService.generateLink(data).success(showGeneratedLink)
    }

    function showGeneratedLink(data, status, headers, config){
    	$scope.link = data
    }

    // setTimeout(function(){
    //     window.print();
    // },1000)    
}];