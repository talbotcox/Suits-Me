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
					displayCity(geoPosition.coords.latitude,geoPosition.coords.longitude,function(finalTown,zipp){
						cb(finalTown,zipp)
					})
				})
			}							

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
		console.log(data);
					var zip = data.results[0];
					console.log(zip.address_components[2].long_name,zip.address_components[4].short_name)
					var zipp = zip.address_components[6].long_name;
		            var city = data.results[4];
		            var final = (city.formatted_address);
					var finalTown = final.split(',')[0] //I took out final town to get it for me see beside
					finalTown = [zip.address_components[2].long_name+",",zip.address_components[4].short_name]
					cb(finalTown,zipp)
					}
				}
				request.send();
			}

			// this will be the 'wether' equivalent of displayCity
			mf.displayWeather = function(zipp,cb){
			var doppler= this;
					$http.get('http://api.openweathermap.org/data/2.5/weather?zip='+zipp+',us&units=imperial&APPID=6c47381f22d2fc308cc3d5f06edd3d41')
		        .then(function(response){
				console.log(response)
				var temp = Math.floor(response.data.main.temp)
				var tempMax = Math.floor(response.data.main.temp_max)
				var sky =  response.data.weather[0].description
				var skyIcon =  response.data.weather[0].icon  //http://openweathermap.org/weather-conditions
				
				cb(temp, tempMax, sky, skyIcon) //callback to the main.js file
				

		        })
				
			}

			


			

			return mf
		}

}())


