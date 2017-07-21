'use strict';
//dddxddddddвddde

/*===========================================================================================
Регионы
===========================================================================================*/

servicesModule.factory('regionSrvc', function(RESTSrvc,settings) {    
    return {
    	/* Все регионы */
        getNearestCities: function(coord){
            return RESTSrvc.getPromise({method: 'GET', url: settings.server + 'nearest/' + coord.lat + '/' + coord.lng + '/' + coord.limit});
        },
		getAllCities: function(){
			return RESTSrvc.getPromise({method: 'GET', url: settings.server + 'cities/'});
		}
        /* Все группы факультета */
        /* getRegions: function(id){
            return RESTSrvc.getPromise({method: 'GET', url: DemoSetting.appName + '/json/region/' + id + '/group'});
        }, */
		

    }
});
