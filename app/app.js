'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.view1',
  'myApp.view2',
  'myApp.home',
  'myApp.products',    
  'myApp.version',
  'ui.grid',
  'ui.grid.edit'  
]).
config(['$routeProvider', function($routeProvider) {
  	$routeProvider.
  		otherwise({
  			redirectTo: '/home'
  		});
}]);
