angular.module('starter.controllers', ['pubnub.angular.service'])

.controller('MainCtrl', function($scope, RardarList) {
	//RardarList.current_location_radar_init();
	$scope.PostList =  RardarList.list;
	
	$scope.Here = function() {
		
	}
	
	$scope.Map = function() {
		
	}
	
	$scope.Home = function() {
		
	}
	
	$scope.Favourit = function() {
		
	}
})

.controller('UploadCtrl', function($scope, $http, $location) {
	$scope.Title;
	$scope.Content;
	$scope.Post = function(message){
	$http({
		  method  : 'POST',
		  url     : 'https://evening-cliffs-3195.herokuapp.com',
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
		  data    : { Title : message.Title, Content: message.Content},  // pass in data as strings	
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		 }).success(function(data) {
				$location.path('/main');
				//alert("success");
		  });
	};
	
	$scope.Cancel = function(message) {
		alert("Cancel " + message.Title);
	}

})

.controller('DetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.detailId); // http request to get detail at server. 
})

.controller('DashboardCtrl', function($scope) {
  
  $scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    { id: 28 },
    { id: 29 },
    { id: 30 },
    { id: 31 },
    { id: 32 },
    { id: 33 },
    { id: 34 },
    { id: 35 },
    { id: 36 },
    { id: 37 },
    { id: 38 },
    { id: 39 },
    { id: 40 },
    { id: 41 },
    { id: 42 },
    { id: 43 },
    { id: 44 },
    { id: 45 },
    { id: 46 },
    { id: 47 },
    { id: 48 },
    { id: 49 },
    { id: 50 }
  ];
  
});
