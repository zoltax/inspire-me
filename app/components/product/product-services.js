var myApp = angular.module('myApp.products');
//console.log('ok');
myApp.factory('productService', function ($http, $q) {
        return {
            getData: function (route, param) {
                var defer = $q.defer();

                if (typeof param ==='undefined') {
                    $http.get('http://api.inspire-me.dev/' + route).success(function (data) {
                            defer.resolve(data);
                        }
                    ).error(function () {
                            defer.reject('An error has occurred :(');
                        }
                    );
                    return defer.promise;
                } else {
                    $http.get('http://api.inspire-me.dev/' + route + '/'+param).success(function (data) {
                            defer.resolve(data);
                        }
                    ).error(function () {
                            defer.reject('An error has occurred :(');
                        }
                    );
                    return defer.promise;                    
                }
                

            },
            postData: function (route, data) {
                console.log(route);
                console.log('postData');
                console.log(data);
                //alert('test');
                var defer = $q.defer();
                //data = $.param(data);
                $http.post('http://api.inspire-me.dev/'+route, data,
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