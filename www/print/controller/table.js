var Table = ['$scope','$stateParams','ShareService','$state',function ($scope,$stateParams,ShareService,$state) {
    
    $scope.d = JSON.parse(localStorage.getItem('row'))
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

    setTimeout(function(){
        window.print();
    },1000)    
}];