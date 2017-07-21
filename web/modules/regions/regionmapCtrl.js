controllersModule.controller('regionmapController', function ($scope, $routeParams, NgMap, $rootScope, $location, regionSrvc) {
    var vm = this;

    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKWojtxkjHuh44CNE8mw9S-nX3qWeLHGM"
	
    NgMap.getMap().then(function (map) {
        vm.map = map;
        $scope.init();
    });
	
	$scope.markers = [];
    $scope.informationWindows = [];
	
	$scope.getAll = function(){
		
		regionSrvc.getAllCities().then(
				function(data){
					for(var i = 0; i < data.data.length; i++){
						var parsedString = JSON.parse(data.data[i]);
						var marker = $scope.createMarker(parsedString);
						$scope.markers.push(marker);
					}
				},
				function(data,status,headers,config){
					alert(status);
				}
		);
	}
	
	$scope.showAll = function(){

		$scope.getAll();
		
		for(var i = 0; i < $scope.markers.length; i++){
			$scope.markers[i].setMap(vm.map);
		}
		
	}
	
    $scope.clearInfoWindows = function(){
        for(var i = 0; i < $scope.informationWindows.length; i++){
			$scope.informationWindows[i].close();
		}
    }
    
	$scope.clearMap = function(){
		for(var i = 0; i < $scope.markers.length; i++){
			$scope.markers[i].setMap(null);
		}
	}
    
    $scope.createMarkerInfo = function(markerData){
        var contentString = '<div class = "content">' +
                            '<p>' + markerData.city + '</p>' +
                            '<br>' + '<p>' + markerData.id + '</p>'
        
        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });
        
        $scope.informationWindows.push(infoWindow);
        return infoWindow;
    }
    
	$scope.createMarker = function(data){
		var marker = new google.maps.Marker({
			position: {lat: data.latitude, lng: data.longitude},
			map: vm.map,
			title: 'Click to show info',
			id: data.id,
			name: data.city
		});
		
        var markerData = {id: data.id, city: data.city};
        var infoWindow = $scope.createMarkerInfo(markerData);
        
		marker.addListener('click', function(){
				vm.map.setCenter(marker.getPosition());
                $scope.clearInfoWindows();
                infoWindow.open(vm.map, this);
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