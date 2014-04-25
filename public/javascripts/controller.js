var HandLeapApp = angular.module('HandLeapApp', []);

HandLeapApp.controller('HandLeapController', function ($scope, $http) {

  $scope.controller = {};
  $scope.connectionStatus = "NOTHING GREAT.. Connect the device";
  $scope.volumeLevel = 1;
  $scope.trackName = "";


  var init = function () {
    $scope.controller = new Leap.Controller({ enableGestures: true });

    $scope.controller.on('connect', function () {
      console.log("Connected");
      changeStatus("Successfully connected to device");
      ;
    });

    $scope.controller.on('deviceConnected', function () {
      console.log("device Connected");
      changeStatus("A Leap device has been connected.");
    });

    $scope.controller.on('deviceDisconnected', function () {
      console.log("device disconnected");
      changeStatus("A Leap device has been disconnected.");
    });

    $scope.controller.on('frame', function (frame) {
      $scope.$apply(function () {
        frameChanged(frame);
      });
    });

    $scope.controller.connect();

    getTrackInfo();
  }

  var frameChanged = function (frame) {
    _.each(frame.gestures, function (gesture) {
      console.log("Gesture " + gesture);
      $scope.gestureType = gesture.type;
    });
  }

  var changeStatus = function (status) {
    $scope.$apply(function () {
      $scope.connectionStatus = status;
    });
  }
  $scope.player = function (type) {
    $http.get('player/playlist/' + type).success(function (data) {
      $scope.trackName = data["trackName"];
    });
  }

  $scope.changeVolume = function () {
    $http.get('player/volume?level=' + $scope.volumeLevel).success(function (data) {
      console.log(data);
    })
  }

  var getTrackInfo = function () {
    $http.get('player/playlist/trackInfo').success(function (data) {
      $scope.trackName = data["trackName"];
    })
  }

  init();
});
