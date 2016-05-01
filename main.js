(function() {
angular.module('myApp', [])
    .controller('closetController', ['mapFactory',closetController]);
    
function closetController(mapFactory) {
    var self = this;
    
    mapFactory.displayLocation(function(finalTown){
        return mapFactory.displayWeather(finalTown,function(temp,sky){
            self.weather = {
                temp: temp,
                sky: sky,
                town: finalTown
            }
            console.log(self)
        })
    })
    



    self.refresh = function() {
    	self.coatfinal = getoutfit(coats).image
    	
    	self.shirtfinal = getoutfit(shirts).image
    	
    	self.pantfinal = getoutfit(pants).image

    	
    }




    function getoutfit(list) {
        // var temp = 32;
        var w = tempReturn(self.weather.temp);
        var newList = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].weather.indexOf(w) !== -1) {
                newList.push(list[i])
            }
        }

        return randomItem(newList);
    }



    function randomItem(list) {
        return list[Math.floor(Math.random() * list.length)];
    }


    function tempReturn(t) {
        if(t <= 50){return "cold"}
        if(t <= 65){return "fair"}
        if(t <= 75){return "warm"}
        if(t > 75){return "hot"}
        
    }

    



}
    




}())
 