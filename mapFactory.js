// ;(function(){
// 	'use strict'
	
// }())


;(function(){
	'use strict'
	angular.module('myApp')
		.factory('mapFactory',mapFactory)

		function mapFactory($http){
			var mf = {}

			mf.displayLocation = function(cb){
				navigator.geolocation.getCurrentPosition(function(geoPosition){
					displayCity(geoPosition.coords.latitude,geoPosition.coords.longitude,function(finalTown){
						cb(finalTown)
					})
				})
			}							//sara whitton freaking sucks 

			// change this to displayCity or somehting similar - don't forget to change the references in your controller
			function displayCity(latitude,longitude,cb){
				var request = new XMLHttpRequest();

		        var method = 'GET';
		        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
		        var async = true;

		        request.open(method, url, async);
		        request.onreadystatechange = function(){
		          if(request.readyState == 4 && request.status == 200){
		            var data = JSON.parse(request.responseText);
		            var city = data.results[4];
		            var final = (city.formatted_address);
					var finalTown = final.split(',')[0]
					cb(finalTown)
					}
				}
				request.send();
			}

			// this will be the 'wether' equivalent of displayCity
			mf.displayWeather = function(town,cb){
			var doppler= this;
		       $http.get('http://api.openweathermap.org/data/2.5/forecast/city?q='+town+'&units=imperial&APPID=6c47381f22d2fc308cc3d5f06edd3d41')
		        .then(function(response){
				var temp = Math.floor(response.data.list[0].main.temp)
				var sky =  response.data.list[0].weather[0].description
				cb(temp,sky)
				

		        })
				
			}

			


			

			return mf
		}

}())


