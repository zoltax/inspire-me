'use strict';

angular.module('myApp.products', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	  when('/products', {
	    templateUrl: 'products/products.html',
	    controller: 'ProductsController'
	  }).
	  when('/products/view/:id', {
	    templateUrl: 'products/view.html',
	    controller: 'ProductsViewController'
	  });	  
}])

.controller('ProductsController', [ '$scope', '$http', 'productService', function($scope, $http, productService) {

	console.log('ProductsController');


	$scope.products = [];
	$scope.alert = {showAlert: false, alertClass: 'success', msg: ''};
	$scope.dataAvailable = true;
	var pageNumber = 1;

    $scope.loadProducts = function () {
        productService.getData('products').then(function (data) {
                console.log(data);
                //For future paging ;)
                if (data.length < 5) {
                    $scope.dataAvailable = false;
                }
                angular.forEach(data, function (value) {
                    $scope.products.push(value);
                   
                });

                pageNumber++;
            },
            function (error) {
                $scope.alert = {showAlert:true, msg: error, alertClass: 'danger'};
            }
        );
    };

    $scope.loadProducts();

}])

.controller('ProductsViewController', function ($scope, $routeParams, productService) {
    console.log('ProductsViewController');
    $scope.product = {};
    $scope.alert = {showAlert: false, alertClass: 'success', msg: ''};
 
    // productService.getData('poll', $routeParams.id).then(function (data) {
    //         $scope.poll = data.poll;
    //     },
    //     function (error) {
    //         $scope.alert = {showAlert: true, msg: error, alertClass: 'danger'};
    //     }
    // );
 
    $scope.save = function () {
        if ($scope.product.name) {
            productService.postData({option: $scope.product}).then(function (data) {
                    $scope.alert = { showAlert:true, msg: angular.fromJson(data).mesg, alertClass: 'success' };
                },
                function (error) {
                    $scope.alert = {showAlert:true, msg: error, alertClass: 'danger'};
                });
        } else {
            $scope.alert = {showAlert:true, msg: 'Select something please!', alertClass: 'warning'};
        }
    };
 
});