myApp.directive('imAlert', function () {
    return {
        restrict: 'E',
        scope: {
            showAlert: '=',
            alertMessage : '=',
            alertClass: '='
        },
        template: '<div class="alert alert-{{alertClass}}" ng-show="showAlert">' +
            '<button type="button" class="close" ng-click="close()">&times;</button>' +
            '<p>{{alertMessage}}</p>' +
            '</div>',
        link: function(scope) {
            scope.close = function() {
                scope.showAlert = false;
            };
        }
    };
});
// directive('formInput', function () {
//     return {
//         restrict: 'E',
//         scope: {
//             inputName: '=',
//             inputModel : '=',
//             inputLabel: '=',
//             inputType: '='
//         },
//         templateUrl: 'partials/form-input.html'

//     };
// });
//console.log('product-directives');
angular.module('myApp.products.product-directive', []);


// .directive('formInput',function () {
//     return {
//         restrict: 'E',
//         scope: {
//             inputName: '@',
//             inputModel : '=',
//             inputLabel: '@',
//             inputType: '@'
//         },
//         templateUrl: '/components/product/partials/form-input.html'

//     };
// }
// );
