controllersModule.controller('regionmapController', function ($scope, $routeParams, NgMap, $rootScope, $location, regionSrvc) {
    var vm = this;

    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKWojtxkjHuh44CNE8mw9S-nX3qWeLHGM"
	
    NgMap.getMap().then(function (map) {
        vm.map = map;
        $scope.init();
    });
	
	$scope.markers = [];
    $scope.informationWindows = [];
    $scope.polylines = [];
	
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
    
    
    
    $scope.colorMarker = function(){
        
    }
    
    $scope.recolorToBaseAllMarkers = function(){
        for(var i = 0; i < $scope.markers.length; i++){
            $scope.markers[i].setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
            $scope.markers[i].setAnimation(null);
        }
    }
    
    $scope.coloringNearestCities = function(id){
        $scope.removeAllPolylines();
        var cityRequest = {id: id, limit: 4};
        
        regionSrvc.getNearestCities(cityRequest).then(
            function(data){
                var simplified = {};
                var srcCity = data.data.children[0];
                
                for(var i = 1; i < data.data.children.length; i++){
                    simplified[data.data.children[i].ID] = data.data.children[i].ID;
                }
                
                for(var i = 0; i < $scope.markers.length; i++){
                    if($scope.markers[i].id == simplified[$scope.markers[i].id]){
                        
                        var srcCoord = {lat: parseInt(srcCity.latitude), lng: parseInt(srcCity.longitude)};
                        var destCoord = {lat: $scope.markers[i].lat, lng: $scope.markers[i].lng}
                        $scope.markers[i].infoWindow.open(vm.map, $scope.markers[i]);
                        $scope.markers[i].setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
                        $scope.markers[i].setAnimation(google.maps.Animation.BOUNCE);
                        $scope.createPolyline(srcCoord, destCoord);
                    }
                }
                
            },
            function(data,status,headers,config){
				alert(status);
            }
        );
        
        
    }
    
    $scope.removeAllPolylines = function(){
        while($scope.polylines && $scope.polylines.length){
            var polyline = $scope.polylines.pop();
            polyline.setMap(null)
        }
    }
    
    $scope.createPolyline = function(src, dest){
        
        var coordinates = [
            {lat: src.lat , lng: src.lng},
            {lat: dest.lat, lng: dest.lng}
        ];
        
        
        var polyline = new google.maps.Polyline({
            path: coordinates,
            strokeWeight: 3,
            strokeColor: '#0000FF',
            strokeOpacity: 0.5
        })
        
        $scope.polylines.push(polyline);
        polyline.setMap(vm.map);
        return polyline;
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
        var markerData = {id: data.id, city: data.city};
        var infoWindow = $scope.createMarkerInfo(markerData);
        
		var marker = new google.maps.Marker({
			position: {lat: data.latitude, lng: data.longitude},
			map: vm.map,
			title: 'Click to show info',
			id: data.id,
			name: data.city,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",            
            lat: data.latitude,
            lng: data.longitude,
            infoWindow: infoWindow
		});
		
        
        
		marker.addListener('click', function(){
				vm.map.setCenter(marker.getPosition());
                $scope.recolorToBaseAllMarkers();
                $scope.clearInfoWindows();
                //infoWindow.open(vm.map, this);
                $scope.coloringNearestCities(this.id);
                this.setIcon("http://maps.google.com/mapfiles/ms/icons/yellow-dot.png");
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
