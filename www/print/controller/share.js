var Share = ['$scope','$stateParams','ShareService','$state',function ($scope,$stateParams,ShareService,$state) {    
	$scope.hideGenerate = true;
	ShareService.getCalculation($stateParams.id).success(generateCalculation)

	function generateCalculation (data, status, headers, config){
		$scope.d = data[0]
		$scope.lamelle = 'Lamelle'
    	if($scope.d.anz_choose !== '1'){
        	$scope.lamelle = $scope.lamelle + 'n'
    	}
	}

    setTimeout(function(){
        window.print();
    },1000)    
}];