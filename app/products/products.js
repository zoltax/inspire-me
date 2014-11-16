'use strict';

angular.module('myApp.products', [
    'ngRoute',
    'myApp.products.product-directive'
    ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	  when('/products', {
	    templateUrl: 'products/products.html',
	    controller: 'ProductsController'
	  }).
      when('/products/add', {
        templateUrl: 'products/add.html',
        controller: 'ProductsAddController'
      }).      
	  when('/products/view/:id', {
	    templateUrl: 'products/view.html',
	    controller: 'ProductsViewController'
	  });	  
}])

.controller('ProductsController', [ '$scope', '$http', 'productService', function($scope, $http, productService) {

	console.log('ProductsController');


	$scope.products = [];
	$scope.alert = {showAlert: true, alertClass: 'success', msg: 'yeh'};
	$scope.dataAvailable = true;
	var pageNumber = 1;

    $scope.gridOptions = {
        columnDefs: [
          //{field: 'id', displayName: 'asdf'},
          {field: 'name', displayName: 'Name'},
          {field: 'brand', displayName: 'Brand'},          
          {field: 'kcal', displayName: 'Kcal'},
          {field: 'carb', displayName: 'Carb'},
          {field: 'sugar', displayName: 'Sugar'},          
          {field: 'fat', displayName: 'Fat'},
          {field: 'protein', displayName: 'Protein'},                              
          {field: 'fibre', displayName: 'Fibre'},
          {field: 'capacity', displayName: 'Capacity'},
          {field: 'price', displayName: 'Price'},
        ],
        data : {}
    };

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

                $scope.gridOptions.data = $scope.products;

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
 
})

.controller('ProductsAddController', function ($scope, $routeParams, productService) {
    console.log('ProductsAddController');


    $scope.alert = {showAlert: false, alertClass: 'success', msg: ''};
    $scope.product = {};

    

    $scope.save = function () {

        console.log($scope.product);
        //later when I will add validation I will use that one
        $scope.form_valid = true;

        if ($scope.form_valid) {
            productService.postData('products', $scope.product).then(function (data) {
                    $scope.alert = { showAlert:true, msg: angular.fromJson(data).mesg, alertClass: 'success' };
                },
                function (error) {
                    $scope.alert = {showAlert:true, msg: error, alertClass: 'danger'};
                });
        } else {
            $scope.alert = {showAlert:true, msg: 'Provide  data please!', alertClass: 'warning'};
        }        
        // if ($scope.product.name) {
        //     productService.postData({option: $scope.product}).then(function (data) {
        //             $scope.alert = { showAlert:true, msg: angular.fromJson(data).mesg, alertClass: 'success' };
        //         },
        //         function (error) {
        //             $scope.alert = {showAlert:true, msg: error, alertClass: 'danger'};
        //         });
        // } else {
        //     $scope.alert = {showAlert:true, msg: 'Select something please!', alertClass: 'warning'};
        // }
    };

    $scope.populate = function () {
        $scope.alert = {showAlert:true, msg: 'Populated with red thunder', alertClass: 'success'};
        $scope.product.name = 'HI-IMPACT ENERGY DRINK';
        $scope.product.brand = 'Red Thunder';
        $scope.product.description = 'Carbonated mixed fruit flavour drink with taurine, caffeine and B vitamins';
        $scope.product.capacity = 250;
        $scope.product.price = 0.49;
        $scope.product.kcal = 49;
        $scope.product.protein = 0.5;
        $scope.product.fat = 0.5;
        $scope.product.saturated_fat = 0.5;        
        $scope.product.carb = 12;
        $scope.product.sugar = 11;        
        $scope.product.fibre = 0.5; 

    };


 
});