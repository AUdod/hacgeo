controllersModule.controller('regionmapController', function ($scope, $routeParams, NgMap, $rootScope, $location, regionSrvc) {
    var vm = this;

    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKWojtxkjHuh44CNE8mw9S-nX3qWeLHGM"
	
    NgMap.getMap().then(function (map) {
        vm.map = map;
        $scope.init();
    });
	
	$scope.markers = [];
	
	$scope.getAllCities = function(){
		
		regionSrvc.getAllCities().then({
				function(data){
					for(var i = 0; i < data.data.length; i++){
						alert(data.data.toSource());
						var marker = $scope.createMarker(JSON.parse(data.data));
						$scope.markers.push(marker);
					}
				},
				function (data,status,headers,config){
					alert(status);
				}
		});
	}
	
	$scope.showAll = function(){
		
		$scope.getAllCities();
		
		for(var i = 0; i < $scope.markers.length; i++){
			$scope.markers[i].setMap(vm.map);
		}
		
	}
	
	$scope.clearMap = function(){
		for(var i = 0; i < $scope.markers.length; i++){
			$scope.markers[i].setMap(null);
		}
	}

	$scope.createMarker = function(data){
		var marker = new google.maps.Marker({
			position: {lat: data.latitude, lng: data.longitude},
			map: vm.map,
			title: 'Click to zoom'
		});
		marker.addListener('click', function(){
				vm.map.setZoom(2);
				vm.map.setCenter(marker.getPosition());
		});
		return marker;
	}
	
	$scope.init = function(){
		
		$scope.showAll();
		
		vm.map.addListener('click', function(e) {
			/*$scope.clearMap();
			var marker = $scope.createMarker(e.latLng);
			$scope.markers.push(marker);
			
			vm.map.panTo(marker.getPosition());
			
			var coordinate = {lat: e.latLng.lat, lng: e.latLng.lng, limit: 10};
			
			
			marker.addListener('click', function(){
				vm.map.setZoom(2);
				vm.map.setCenter(marker.getPosition());
			});
			*/
			
			
			
			/*
			regionSrvc.getNearestCities(coordinate).then({
				function(data){
					//$scope.showNearestCities(data.data);
				},
				function (data,status,headers,config){
					alert(status);
				}
			});
			*/
			
		  });



	}

})
