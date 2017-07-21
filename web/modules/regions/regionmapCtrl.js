controllersModule.controller('regionmapController', function ($scope, $routeParams, NgMap, $rootScope, $location, regionSrvc) {
    var vm = this;
    
    
    $scope.limit = 1;
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBKWojtxkjHuh44CNE8mw9S-nX3qWeLHGM"
	
    NgMap.getMap().then(function (map) {
        vm.map = map;
        $scope.init();
    });
	
    $scope.citiesList = [];
    $scope.radiusCircle = null;
    $scope.kilometer = false;
	$scope.markers = [];
    $scope.informationWindows = [];
    $scope.polylines = [];
	
    $scope.kilometerTrigger = function(){
        $scope.kilometer = !$scope.kilometer;
    }
    
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
    
    
    $scope.removeRadiusCircle = function(){
        if($scope.radiusCircle != null){
            $scope.radiusCircle.setMap(null);    
            $scope.radiusCircle.visible = false;    
            
            $scope.radiusCircle = null;    
        }
            
        
    
    
    }
    
    $scope.drawRadiusCircle = function(latlng){
         var cityCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.2,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.2,
              map: vm.map,
              center: latlng,
              radius: parseInt($scope.limit * 1000),
              id: 1
        });
        
        $scope.radiusCircle = cityCircle;

    }
    
    $scope.clearTable = function(){
        $scope.citiesList.splice(0, $scope.citiesList.length);
    }
    
    $scope.coloringNearestCities = function(coords){
        $scope.removeAllPolylines();
        $scope.removeRadiusCircle();
        $scope.clearTable();
        var cityRequest = {latitude: coords.lat(), longitude: coords.lng(), limit: $scope.limit};
        if($scope.kilometer){
            regionSrvc.getNearestCitiesRadius(cityRequest).then(
            function(data){
                
                var simplified = {};
                var dataBuff;
                //var srcCity = data.data.children[0];
                
                for(var i = 0; i < data.data.children.length; i++){
                    for(var j = 0; j < $scope.markers.length; j++){
                        
                        if($scope.markers[j].id == data.data.children[i].ID){
                            
                            var srcCoord = {lat: coords.lat(), lng: coords.lng()};
                            var destCoord = {lat: $scope.markers[j].lat, lng: $scope.markers[j].lng}
                            
                            var infoWindow = $scope.createMarkerInfo(data.data.children[i]);
                            $scope.citiesList.push(data.data.children[i]);
                            infoWindow.open(vm.map, $scope.markers[j]);
                            //$scope.markers[j].infoWindow.open(vm.map, $scope.markers[j]);
                            $scope.markers[j].setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
                            $scope.markers[j].setAnimation(google.maps.Animation.BOUNCE);
                            //$scope.createPolyline(srcCoord, destCoord);    
                            
                        }
                    }
                }
                $scope.drawRadiusCircle(srcCoord);
                
            },
            function(data,status,headers,config){
				alert(status);
            }
        );    
        }
        else{
            regionSrvc.getNearestCities(cityRequest).then(
                function(data){
                    
                    var simplified = {};
                    var dataBuff;
                    //var srcCity = data.data.children[0];

                    for(var i = 0; i < data.data.children.length; i++){
                        for(var j = 0; j < $scope.markers.length; j++){

                            if($scope.markers[j].id == data.data.children[i].ID){

                                var srcCoord = {lat: coords.lat(), lng: coords.lng()};
                                var destCoord = {lat: $scope.markers[j].lat, lng: $scope.markers[j].lng}

                                var infoWindow = $scope.createMarkerInfo(data.data.children[i]);
                                infoWindow.open(vm.map, $scope.markers[j]);
                                //$scope.markers[j].infoWindow.open(vm.map, $scope.markers[j]);
                                $scope.markers[j].setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
                                $scope.markers[j].setAnimation(google.maps.Animation.BOUNCE);
                                $scope.createPolyline(srcCoord, destCoord);    
                            }
                        }
                    }

                },
                function(data,status,headers,config){
                    alert(status);
                }
        );  
        }
        
        
        
        
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
                            '<p>' + markerData.dist + ' km' + '</p>'
        
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
			name: data.city,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",            
            lat: data.latitude,
            lng: data.longitude,
		});
		
		/*marker.addListener('click', function(){
				vm.map.setCenter(marker.getPosition());
                $scope.recolorToBaseAllMarkers();
                $scope.clearInfoWindows();
                //infoWindow.open(vm.map, this);
                $scope.coloringNearestCities(this.id);
                this.setIcon("http://maps.google.com/mapfiles/ms/icons/yellow-dot.png");
		});*/
		return marker;
	}
	
    
	$scope.init = function(){
		
		$scope.showAll();
		
		vm.map.addListener('click', function(e) {
			    vm.map.setCenter(e.latLng);
                $scope.recolorToBaseAllMarkers();
                $scope.clearInfoWindows();
                //infoWindow.open(vm.map, this);
                $scope.coloringNearestCities(e.latLng);
                this.setIcon("http://maps.google.com/mapfiles/ms/icons/yellow-dot.png");
			
		  });



	}

})
