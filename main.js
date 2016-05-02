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
    	self.coatfinal = weatherReturn(coats).name
    	
    	self.shirtfinal = weatherReturn(shirts).name
    	
    	self.pantfinal = weatherReturn(pants).name

    	console.log('Jakcet: ',self.coatfinal)
        console.log('Shirt: ',self.shirtfinal)
        console.log('Pants: ',self.pantfinal)
    }


        function getMatchingCategory(item, category) {
      let matches = []
      let keys = Object.keys(item.matchingGroups);
      let len = keys.length -1;
      let i = -1
      while(i++ < len) {
        let type = item.matchingGroups[keys[i]];
        if (Array.isArray(type)) {
          let length = type.length -1;
          let j = -1;
          while(j++ < length) {
            let match = type[j];
            if (type[j].category === category) {
              matches.push(type[j])
            }
          }
        }
      }
      return matches
    }



    function weatherReturn(list) {
        //var temp = 80;
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
 