var HandLeapApp = angular.module('HandLeapApp', []);

HandLeapApp.controller('HandLeapController', function ($scope) {

	$scope.controller ={};
	$scope.connectionStatus = "NOTHING GREAT.. Connect the device";

	var init = function(){
		$scope.controller = new Leap.Controller({ enableGestures: true });

		$scope.controller.on('connect', function() {
			console.log("Connected");
		  changeStatus("Successfully connected to device");;
		});

		$scope.controller.on('deviceConnected', function() {
			console.log("device Connected");
		  changeStatus("A Leap device has been connected.");
		});

		$scope.controller.on('deviceDisconnected', function() {
			console.log("device disconnected");
		  changeStatus("A Leap device has been disconnected.");
		});

		$scope.controller.on('frame', function(frame){
			$scope.$apply(function(){
				frameChanged(frame);
			});
		});

		$scope.controller.connect();
	}

	var frameChanged = function(frame) {
		_.each(frame.gestures, function(gesture){
			console.log("Gesture "+gesture);
			$scope.gestureType = gesture.type;
		});
	}

	var changeStatus = function(status){
    $scope.$apply(function(){
      $scope.connectionStatus = status;
    });
  }

	init();
});
