var app = angular.module('fieger', ['ui.router','ngSanitize','ngAnimate','app.ctrl', 'LocalStorageModule']);
app.config([
    '$locationProvider','$stateProvider','$urlRouterProvider','$animateProvider',
    function($locationProvider,$stateProvider,$urlRouterProvider,$animateProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $stateProvider
        .state("/", {
            url: "/",
            controller: "Index",
            resolve: loadcontent,
            templateUrl: "js/templates/index.html"
        }).state("/lamellenfenster", {
            url: "/lamellenfenster",
            controller: "Lamellenfenster",
            resolve: loadcontent,
            templateUrl: "js/templates/lamellenfenster.html"
        }).state("/ueber", {
            url: "/ueber",
            controller: "Start",
            resolve: loadcontent,
            templateUrl: "js/templates/ueber.html"
        }).state("/produkte", {
            url: "/produkte",
            controller: "Start",
            resolve: loadcontent,
            templateUrl: "js/templates/produkte.html"
        }).state("/service", {
            url: "/service",
            controller: "Start",
            resolve: loadcontent,
            templateUrl: "js/templates/service.html"
        }).state("/referenzen", {
            url: "/referenzen",
            controller: "Start",
            resolve: loadcontent,
            templateUrl: "js/templates/referenzen.html"
        }).state("/zubehoer", {
            url: "/zubehoer",
            controller: "Start",
            resolve: loadcontent,
            templateUrl: "js/templates/zubehoer.html"
        }).state("/spezialausfuehrungen", {
            url: "/spezialausfuehrungen",
            controller: "Spezial",
            resolve: loadcontent,
            templateUrl: "js/templates/spezialausfuehrungen.html"
        }).state("/themen", {
            url: "/themen",
            controller: "Themen",
            resolve: loadcontent,
            templateUrl: "js/templates/themen.html"
        }).state("/themen/:news", {
            url: "/themen/:news",
            controller: "Themen",
            resolve: loadcontent
        })
        .state("/fensterberechnung/FLW40", {
            url: "/fensterberechnung/FLW40",
            templateUrl: "js/templates/berechnungen/FLW40.html",
            controller: "FLW40"
        }).state("/fensterberechnung/FLW28", {
            url: "/fensterberechnung/FLW28",
            controller: "FLW28",
            templateUrl: "js/templates/berechnungen/FLW28.html"
        }).state("/fensterberechnung/FLW24", {
            url: "/fensterberechnung/FLW24",
            controller: "FLW24",
            templateUrl: "js/templates/berechnungen/FLW24.html"
        }).state("/fensterberechnung/FGL", {
            url:"/fensterberechnung/FGL",
            controller: "FGL",
            templateUrl: "js/templates/berechnungen/FGL.html"
        }).state("/downloads", {
            url:"/downloads",
            controller: "Start",
            resolve: loadcontent,
            templateUrl: "js/templates/downloads.html"
        }).state("/kontakt", {
            url: "/kontakt",
            controller: "Start",
            resolve: loadcontent,
            templateUrl: "js/templates/kontakt.html"
        }).state("/faq", {
            url: "/faq",
            controller: "Start",
            templateUrl: "js/templates/faq.html"
        }).state("/agb", {
            url:"/agb",
            controller: "Start",
            templateUrl: "js/templates/agb.html"
        }).state("/impressum", {
            url: "/impressum",
            controller: "Start",
            templateUrl: "js/templates/impressum.html"
        })
        // .state("/partner", {
        //     url: "/partner",
        //     controller: "Start",
        //     templateUrl: "js/templates/partner.html"
        // })
        .state("/sitemap", {
            url: "/sitemap",
            controller: "Start",
            templateUrl: "js/templates/sitemap.html"
        })
        // .state("/print", {
        //     url: "/print",
        //     controller: "Print",
        //     templateUrl: "js/templates/print.html"
        // });
    }
]);
var ctrl = angular.module('app.ctrl', ['ngAnimate']).controller('Start', Start).controller('FLW40', FLW40).controller('FLW28', FLW28).controller('FLW24', FLW24).controller('Themen', Themen).controller('Index', Index).controller('Lamellenfenster', Lamellenfenster);


app.run(['$rootScope','$timeout','$location',function($rootScope,$timeout,$location) {
    $rootScope.readerShow = 0;
    $rootScope.readerLoader = 0;

    $rootScope.loadReader = function(){
        $rootScope.readerLoader = 1; 
    }  
    
    $rootScope.showReader = function(){
        $rootScope.readerShow = 1;
    }

    $rootScope.resetReader = function(){
        $rootScope.reader = "";
        $rootScope.readerLoader = 0;
        $rootScope.readerShow = 0;
    }

    $rootScope.closeReader = function(){
        if(window.history.length > 2){
            window.history.back();
        }else{
            $location.path('/themen');
        }
    }

    $rootScope.$on('$viewContentLoaded', function() {
        if($(window).scrollTop() > 0){
            $('html,body').animate({scrollTop: 0}, 750, 'easeInOutExpo');
        }
        $('.container').css('min-height',$(window).height()-151+'px');
        $timeout(function(){
            NProgress.done();
        },500);
    });
    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $rootScope.resetReader();
        setTimeout(function(){
            $('footer').fadeIn(300);
        },1200);
        $('body').removeClass('hidden');
        $('header a').removeClass('active');

        $('header a').each(function(index, el) {
            if(to.url == $(this).attr('href')){
                $(this).addClass('active');
            }
        });
    });

    $rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {
        $('footer').hide();
        NProgress.start();
    });
    setTimeout(function(){initFancy();},1500)
    
}]);


var loadcontent = {
    'MyServiceData': function(loadContent) {
        return loadContent.promise;
    }
};
app.service('loadContent', ['$http','localStorageService','$rootScope',function($http, localStorageService,$rootScope) {
    var lang = navigator.language || navigator.userLanguage;
    var isLanguageSet = localStorageService.get('lang');
    if ($rootScope.d === undefined) {
        if (lang == "de") {
            localStorageService.set('lang', lang);
        } else {
            localStorageService.set('lang', "en");
        }
    }
    var promise = $http.get('js/lang/' + localStorageService.get('lang') + '.json').success(function(data) {
        $rootScope.d = data;
    });
    return {
        promise: promise,
        getData: function() {
            return promise;
        }
    };
}]);

app.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault();
                });
            }
        }
    };
});

app.controller('MenuCtrl', ['loadContent','$rootScope','$scope','localStorageService',function(loadContent,$rootScope,$scope,localStorageService){
    loadContent.getData().then(function(resp) {
        $scope.Menu = resp.data.Menu;
        $scope.Footer = resp.data.Footer;
        $scope.Copyright = resp.data.Copyright;
    });

    $scope.changeLanguage= function(l){
        localStorageService.set('lang',l);
        location.reload();
    };
}]);

// VALIDIERUNG

var error_messages = ["Der angegebene Wert ist zu klein!", "Der angegebene Wert ist zu groß!", "Das Feld ist leer!"];
var error_insert = function(text) {
    $('.md-content p').text(text);
};

app.directive('validate', ['$state',function($state) {
    return function(scope, elem, attrs) {
        var minmax = attrs.validate.split(',');
        var errorclass = 'error_';
        for (var i = 0; i < minmax.length; i++) minmax[i] = parseInt(minmax[i], 10);
        elem.on('keydown', function(e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
        elem.on('keyup', function(e) {
            var num = parseInt($(this).val());
            if ($.inArray(e.keyCode, [46, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode !== 8) {
                e.preventDefault();
            } else if (e.keyCode == 8) {
                setError($(this), num, minmax[0], minmax[1], errorclass,scope,attrs);
            } else {
                setError($(this), num, minmax[0], minmax[1], errorclass,scope,attrs);
            }
        });
        elem.on('blur', function(e) {
            var that = $(this);
            setTimeout(function(){
                var url = $state.current.url;
                
                if(url.indexOf('fensterberechnung') > -1){
                    var val_ = that.val();
                    if (that.hasClass(errorclass) || val_ === '') {
                        if (val_ === '') {
                            that.addClass(errorclass);
                            error_insert(error_messages[2]);
                        }
                        that.trigger('focusout');
                        $('.md-overlay,.md-modal').addClass('active');
                    }
                }
            },500);            
        });
    };
}]);

app.directive('onFinishRender',['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
    };
}]);

function setError(that, num, min, max, errorclass,scope,attrs) {
    if (num < min) {
        that.addClass(errorclass);
        error_insert(error_messages[0]);
    } else if (num > max) {
        that.addClass(errorclass);
        error_insert(error_messages[1]);
    } else {
        that.removeClass(errorclass);
    }
}

app.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});

app.directive('validatecalc', function() {
    return function(scope, elem, attrs) {
        var tochange = attrs.w;
        attrs.$observe('validatecalc', function(value) {

            var test = parseFloat(value.replace(' m²','').replace(' W/m²K','').replace(' N/m²',''));

            if (test == Infinity || isNaN(test) || test < 0) {
                scope[tochange] = "-";
            }
            else{
                scope[tochange] = (scope[tochange]).replace('.',',');
            }
        });
    };
});