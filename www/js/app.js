// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('NEX', ['ionic', 'pubnub.angular.service', 'starter.controllers'])

.run(function($ionicPlatform, PubNub, RardarList) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	PubNub.init({    
		ssl           : true,
		publish_key   : "pub-c-7b8f064f-cc65-4656-8d63-d6760bb6e0fe",
		subscribe_key : "sub-c-abe025b6-b042-11e4-85c1-02ee2ddab7fe"
	});
	
	RardarList.current_location_radar_init();
	
  });
})
.service('RardarList', function($rootScope, $http, PubNub){
	var self = this;
	self.list = [];	
		
	function updatePostList(text) {
		self.list.unshift(text);
		$rootScope.$apply();
		//$scope.PostList.pop();
	}


	this.current_location_radar_init = function() {	
		var url = "https://evening-cliffs-3195.herokuapp.com?callback=JSON_CALLBACK";
		var request = $http.jsonp(url);		
		 
		request.success(function(data) {
			var my_channel = data.mychannel;
			PubNub.ngSubscribe({ channel: my_channel });

			$rootScope.$on(PubNub.ngMsgEv(my_channel), function(ngEvent, payload) {
					updatePostList(payload.message);
			});
		});
	}
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/_tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.main', {
      url: '/main',
      views: {
        'tab-main': {
          templateUrl: 'templates/1.main.html',
          controller: 'MainCtrl'
        }
      }
    })

    .state('tab.upload', {
      url: '/upload',
      views: {
        'tab-upload': {
          templateUrl: 'templates/2.upload.html',
          controller: 'UploadCtrl'
        }
      }
    })
	
    .state('tab.main.detail', {
      url: '/main/:detailId',
      views: {
        'tab-detail': {
          templateUrl: 'templates/4.detail.html',
          controller: 'DetailCtrl'
        }
      }
    })

    .state('tab.dashboard', {
      url: '/dashboard',
      views: {
        'tab-dashboard': {
          templateUrl: 'templates/3.dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })
	
	.state('tab.setting', {
      url: '/setting',
      views: {
        'tab-setting': {
          templateUrl: 'templates/5.setting.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/main');

});