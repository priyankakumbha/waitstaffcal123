(function () {
'use strict';
  angular.module("app",["ngRoute", "ngAnimate"])
     .factory("totalEarnings", function () {
        var earnings = {
            tipTotal: 0,
            mealCount: 0,
            averageTip: 0
        }
        return {
            get: function() {
                return earnings;
            },
            add: function(tip) {
                earnings.tipTotal += tip;
                earnings.mealCount=+1;
                earnings.averageTip = earnings.tipTotal / earnings.mealCount;
            },
            reset: function() {
                earnings.tipTotal = 0;
                earnings.mealCount = 0;
                earnings.averageTip = 0;
            }
        }
    })
      .run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function () {
            $location.path("/error");
        });
       })
      .config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "app/home.html"
        })
        .when("/new-meal", {
            templateUrl: "app/new-meal.html",
            controller: "MyCtrl"
        })
        .when("/Myearnings", {
            templateUrl: "app/Myearnings.html",
            controller: "Myearnings"
        })
        .otherwise({
            redirectTo: "/"
        })
        .when('/error', {
            template: '<p>Error Page Not Found</p>'
        }); 
      })
      

     .controller('Myearnings', function($scope,totalEarnings) {
        $scope.data = totalEarnings.get();
        $scope.reset = function() {
              totalEarnings.reset();
              $scope.data = totalEarnings.get();
         }
        
         
         
     })
 
 	 .controller('MyCtrl', function($scope ,totalEarnings) {
       
            initializeForm($scope);
            $scope.addmeal=function()  {
              $scope.submitted = true;
              if (!$scope.myForm.$valid) {
                return;
              } 
             
            var meal = $scope.data;
            meal.tax = meal.taxRate * meal.price / 100;
            meal.subtotal = meal.price + meal.tax;
            meal.tip = meal.subtotal * meal.tipPercentage / 100;
            meal.totalPrice = meal.subtotal + meal.tip;
            
           
           
             totalEarnings.add(meal.tip);
            $scope.myForm.$setPristine();
            
            }; 
                
            $scope.cancel = function() {
            $scope.data.price=0;
            $scope.data.taxRate=0;
            $scope.data.tipPercentage=0;
            $scope.myForm.$setPristine();     
            };
          
           

           $scope.hasError = function (field, validation) {
             if (! $scope.submitted) {
                return false;
              }

              if (validation === undefined) {
                validation = "required";
              }

            return $scope.myForm[field].$error[validation];
         };
             
         function initializeForm($scope) {
            $scope.submitted=false;
            $scope.data = {
                    price: 0,
                    taxRate: 0,
                    tipPercentage: 0,
                    tax: 0,
                    subtotal: 0,
                    tip: 0,
                    totalPrice: 0,
                      
            }
            
        };

        
         
});
        

})();
            
 
           
           

       
                
            
        


