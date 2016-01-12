'use strict';

var marcApp = angular.module('marcApp', ['ngRoute', 'chart.js', 'marcApp.market','marcApp.achievements']);
// configure our routes
marcApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'views/prisoners.html',
            controller: 'PrisonersController'
        })
        // route for the home page
        .when('/Overview', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // route for the security page
        .when('/Security', {
            templateUrl: 'views/security.html',
            controller: 'SecurityController'
        })
        // route for the prisoners page
        .when('/Prisoners', {
            templateUrl: 'views/prisoners.html',
            controller: 'PrisonersController'
        })
        // route for the reports page
        .when('/Reports', {
            templateUrl: 'views/reports.html',
            controller: 'ReportsController'
        })
        
        .otherwise({redirectTo: '/'});
    }
);

marcApp.run(function() {
    if(FastClick){
        FastClick.attach(document.body);
    }
});

marcApp.directive('duplicate', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          array: '=duplicate'
        },
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                var duplicate = scope[attrs.duplicate];
                if (scope.array.indexOf(Number(viewValue)) !== -1) {
                    ctrl.$setValidity('duplicate', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('duplicate', true);
                    return viewValue;
                }
            });
        }
    };
});


//Sidebar controller to change tab highlight
marcApp.controller('SideBar', function($scope, $location, upgrades) {
    $scope.isActive = function(route) {
        $scope.path = $location.path();
        return $location.path() === route;
      };
});


marcApp.controller('MainController', ['$scope', 'candyPeople', 'industry', 'stats', 'upgrades', function($scope, candyPeople, industry, stats, upgrades) {

    console.log('hodor');

    $scope.workers = stats.getPopulation;
    $scope.items = industry;
    $scope.data = [
      stats.getDistribution(),
    ];
    $scope.labels = ['Taffy', 'JellyBeans', 'DoughNuts', 'JawBreakers', 'Peppermint', 'RockCandy'];

}]);

marcApp.controller('StockController', ['$scope', 'stats', '$timeout', function($scope, stats, $timeout) {

      $scope.series = ['Taffy', 'JellyBeans', 'DoughNuts', 'JawBreakers', 'Peppermint', 'RockCandy'];
      $scope.labels = [30, '', '', '', '', 25, '', '', '', '', 20, '', '', '', '', 15, '', '', '', '', 10, '', '', '', '', 5, '', '', '', 1];

        $scope.data = stats.getHistory;
        $timeout(function() {$scope.data = stats.getHistory();}, 1);

}]);

// create the controller and inject Angular's $scope
marcApp.controller('PrisonersController', ['$scope', 'candyPeople', 'industry', function($scope, candyPeople, industry) {
    console.log('prisoners');
    $scope.base = candyPeople.taffy;
    $scope.items = industry;

    //we need to use candypeople as an array
    //because angular only filters on arrays when using ng-repeat
    var output = [];
    for (var i in candyPeople) {
        output.push(candyPeople[i]);
    }
    $scope.candyPeople = output;

    $scope.verify = function(form){
        if(form.$valid){
            $scope.base.pick1 = $scope.base.picks[0];
            $scope.base.pick2 = $scope.base.picks[1];;
            $scope.base.pick3 = $scope.base.picks[2];;
            $scope.base.pick4 = $scope.base.picks[3];;
            $scope.base.pick5 = $scope.base.picks[4];;
            $scope.base.verify(true);
        } else {
            $(verifyPicks).addClass("wiggle")
            setTimeout(function(){ $(verifyPicks).removeClass("wiggle") }, 1000);
        }
    }
    
    

}]);

var expect = chai.expect;
