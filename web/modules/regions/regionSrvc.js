'use strict';
//dddxddddddвddde

/*===========================================================================================
Регионы
===========================================================================================*/

servicesModule.factory('regionSrvc', function(RESTSrvc,settings) {    
    return {
    	/* Все регионы */
        getNearestCities: function(city){
            return RESTSrvc.getPromise({method: 'GET', url: settings.server + 'nearestcities/' + city.latitude + '/' + city.longitude + '/' + city.limit});
        },
        getNearestCitiesRadius: function(city){
            return RESTSrvc.getPromise({method: 'GET', url: settings.server + 'nearestcitiesradius/' + city.latitude + '/' + city.longitude + '/' + city.limit});
        },
		getAllCities: function(){
			return RESTSrvc.getPromise({method: 'GET', url: settings.server + 'cities'});
		}
        /* Все группы факультета */
        /* getRegions: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appName + '/json/region/' + id + '/group'});
        }, */
		

    }
});
