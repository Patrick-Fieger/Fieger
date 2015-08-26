var app = angular.module('printApp', ['ui.router','app.ctrl']);
app.config([
    '$locationProvider','$stateProvider','$urlRouterProvider',
    function($locationProvider,$stateProvider,$urlRouterProvider) {
        $stateProvider
        .state("/simple", {
            url: "/simple",
            templateUrl: 'print.html',
            controller: "Simple"
        })
        .state("/share/:id", {
            url: "/share/:id",
            templateUrl: 'print.html',
            controller: "Share"
        })
        .state("/multiple", {
            url: "/multiple",
            templateUrl: 'print.html',
            controller: "Table"
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