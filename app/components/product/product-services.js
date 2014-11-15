var myApp = angular.module('myApp.products');
//console.log('ok');
myApp.factory('productService', function ($http, $q) {
        return {
            getData: function (route, param) {
                var defer = $q.defer();

                if (typeof param ==='undefined') {
                    $http.get('http://api.inspire-me.dev:8000/' + route).success(function (data) {
                            defer.resolve(data);
                        }
                    ).error(function () {
                            defer.reject('An error has occurred :(');
                        }
                    );
                    return defer.promise;
                } else {
                    $http.get('http://api.inspire-me.dev:8000/' + route + '/'+param).success(function (data) {
                            defer.resolve(data);
                        }
                    ).error(function () {
                            defer.reject('An error has occurred :(');
                        }
                    );
                    return defer.promise;                    
                }
                

            },
            postData: function (data) {
                var defer = $q.defer();
                data = $.param(data);
                $http.post('http://localhost:8000/api/products/', data,
                    {'headers': {
                        'Content-Type': 'application/x-www-form-urlencoded,charset=UTF-8'
                    }}).
                    success(function (data) {
                        defer.resolve(data);
                    }
                ).error(function () {
                        defer.reject('Cannot post data to the server :(');
                    }
                );
                return defer.promise;
            }
        };
    }
);