var app = angular.module('printApp', ['ngRoute']);
app.config([
    '$locationProvider','$routeProvider',
    function($locationProvider,$routeProvider) {
        $routeProvider.otherwise("/");
    }
]).controller('Print', function($location,$scope){
    $scope.d = function () {
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
          query_string[pair[0]] = arr;
        } else {
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
      } 
        return query_string;
    }();

    $scope.lamelle = 'Lamelle'
    
    if($scope.d.anz_choose !== '1'){
        $scope.lamelle = $scope.lamelle + 'n'
    }

    setTimeout(function(){
        window.print();
    },1000)    
});