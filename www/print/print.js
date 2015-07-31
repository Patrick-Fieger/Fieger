var app = angular.module('printApp', ['ui.router','app.ctrl']);
app.config([
    '$locationProvider','$stateProvider','$urlRouterProvider',
    function($locationProvider,$stateProvider,$urlRouterProvider) {
        $stateProvider
        .state("/simple", {
            url: "/simple",
            templateUrl: 'simple.html',
            controller: "Simple"
        })
        .state("/table", {
            url: "/table",
            templateUrl: 'insert.html',
            controller: "Table"
        })
        .state("/share/:id", {
            url: "/share/:id",
            templateUrl: 'simple.html',
            controller: "Share"
        })

        $urlRouterProvider.otherwise("/");
    }
]).service('ShareService', function($http){
  var url = ["http://46.101.205.150:3000","http://localhost:3000"];
  var dev_ = 1;

  var generateLink = function(data){
    return $http.post(url[dev_] + '/generate',data)
  }

  var getCalculation = function(id){
    return $http.get(url[dev_] + '/calculation',{params: { id : id}})
  }

  return{
    generateLink : generateLink,
    getCalculation : getCalculation
  }
})

var ctrl = angular.module('app.ctrl', [])
.controller('Simple', Simple)
.controller('Table', Table)
.controller('Share', Share)