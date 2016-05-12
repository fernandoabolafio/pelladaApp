var app = angular.module('parkmeister',[]);

app.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window){

    var loginError = false;

    $scope.register = function (user) {
        $http({
            method: 'POST',
            url: '/signup',
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if (response.status === 201) {
                $window.location.href = '/search';
            }
            //TODO: Display duplicate email!
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            if (response.status == 401) {

            }
        });
    };

    $scope.loginError = function() {
        return loginError;
    };



    $scope.login = function (user) {
        $http({
            method: 'POST',
            url: '/login',
            data: {
                email: user.email,
                password: user.password
            }
        }).then(function successCallback(response) {
            if (response.status === 200) {
                $window.location.href = '/search';
            }
            //TODO: Display duplicate email!
        }, function errorCallback(response) {
            if (response.status === 401) {
                loginError = true;
            }
        });
    };

    $scope.logout = function () {
        $http({
            method: 'POST',
            url: '/logout'
        }).then(function successCallback(response) {
            if (response.status === 200) {
                $window.location.href = '/';
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };

}]);

app.controller('GroupController', ['$scope', '$http', '$window', function($scope, $http, $window){
  $http({
      method: 'GET',
      url: '/account/me'
  }).then(function successCallback(response) {
      if (response.status === 200) {
          $scope.me = response.data;
      }
  }, function errorCallback(response) {
      console.log(response);
  });



  this.init = function(groupId) {
    console.log("HAA ");
    $http({
        method: 'GET',
        url: '/club/'+groupId

    }).then(function successCallback(response) {
        if (response.status === 200) {
            $scope.club = response.data;
            console.log(response.data);
        }
    }, function errorCallback(response) {
        console.log(response);
    }).then(function (response){
      $http({
          method: 'GET',
          url: '/club/players/'+ $scope.club.club_id
      }).then(function successCallback(response) {
        console.log(response.data);
          if (response.status === 200) {
              $scope.players = response.data;
          }
      }, function errorCallback(response) {
          console.log(response);
      });
      $scope.openGroup = function(groupId){
        $window.location.href = '/club/'+groupId;
      };
    });
};


}]);

app.controller('SearchController', ['$scope', '$http', '$window', function($scope, $http, $window){
  var user_id = $scope.me;
  $http({
      method: 'GET',
      url: '/account/me'
  }).then(function successCallback(response) {
      if (response.status === 200) {
          $scope.me = response.data;
      }
  }, function errorCallback(response) {
      console.log(response);
  });

  $http({
    method: 'GET',
    url: '/myclubs',
  }).then(function successCallback(response) {
    if (response.status === 200) {
        $scope.myclubs = response.data;
    }

  }, function errorCallback(response) {
      console.log(response);
  });

  $http({
    method: 'GET',
    url: '/clubs',
  }).then(function successCallback(response) {
    if (response.status === 200) {
        $scope.clubs = response.data;
    }

  }, function errorCallback(response) {
      console.log(response);
  });


  $.get("http://ipinfo.io", function (response) {
   var ip = response.ip;
   var city = response.city;
   var region = response.region;
   var postal = response.postal;
   var location = response.loc;
   $scope.loc = response.data;
   console.log("TESTTTT" + ip + city + region);
   //console.log(JSON.stringify(response, null, 4));

   $("#city").html(city);
   $("#postal").html(postal);
   $("location").html(location);

  }, "jsonp");

  $scope.createClub = function (club) {
    console.log(club.admin_id);
      $http({
          method: 'POST',
          url: '/clubs/new',
          data: {
              club_name: club.name,
              club_weekday: club.day,
              club_time: club.time,
              club_type: club.type,
              club_location: club.location,
              admin_id: $scope.me.user_id}
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if (response.status === 201) {
              $window.location.href = '/search';
          }
          //TODO: Display duplicate email!
      }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          if (response.status == 401) {

          }
      });
  };

}]);
