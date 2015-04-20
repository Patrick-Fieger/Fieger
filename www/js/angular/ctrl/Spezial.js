var Spezial = ['$scope', '$log', '$location','PhotoService',function ($scope, $log, $location,PhotoService) {
	PhotoService.init('.gallery-1')
	addClassForEachElement('.referenzen figure');
}];