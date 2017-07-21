var servicesModule = angular.module('servicesModule', []);
var controllersModule = angular.module('controllersModule', []);
var directivesModule = angular.module('directivesModule', []);
var mainModule = angular.module('mainModule', ['servicesModule', 'controllersModule', 'directivesModule', 'ngRoute', 'ngMap'])

mainModule.config(function ($routeProvider) {

	$routeProvider.when('/regionsmap/', {
		templateUrl: 'modules/regions/regionmap.html',
		controller: 'regionmapController'
	});
	
});