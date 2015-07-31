var Table = ['$scope','$stateParams',function ($scope,$stateParams) {
    $scope.d = ""

    $scope.lamelle = 'Lamelle'

    if($scope.d.anz_choose !== '1'){
        $scope.lamelle = $scope.lamelle + 'n'
    }
    setTimeout(function(){
        window.print();
    },1000)    
}];