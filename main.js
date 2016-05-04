(function() {
angular.module('myApp', [])
    .controller('closetController', ['mapFactory',closetController]);
    
function closetController(mapFactory) {
    var self = this;
    
    mapFactory.displayLocation(function(finalTown,zipp){
        return mapFactory.displayWeather(zipp,function(temp, tempMax, sky, skyIcon){
            self.appInfo = {
                temp: temp + "℉",
                tempMax: tempMax,
                time: timeOBJ,
                sky: sky,
                skyIcon: "http://openweathermap.org/img/w/"+skyIcon+".png",
                town: finalTown,
                zip: zipp,
                weather:tempReturn(tempMax),
                // style: self.stylePicker
            }
            console.log(self)
        })
    })



//==================This is function for Style Picker Button============================
    self.stylePicker = day()
    self.changeStyle = function(style){
        self.stylePicker = style
    }
//=================This function Gets a new Outfit based off Style & Weather============
    self.refresh = function() {
    	var shirtsArr = getShirts(shirts, self.appInfo.weather, self.stylePicker)
    	self.shirtFinal = randomItem(shirtsArr)

        var pantsArr = getPants(self.shirtFinal, pants, self.appInfo.weather, self.stylePicker, badColors)
    	self.pantFinal = randomItem(pantsArr)

        var coatsArr = getCoats(self.shirtFinal, coats, self.appInfo.weather, self.stylePicker, badColors)
        self.coatFinal = randomItem(coatsArr)

        var shoesArr = getShoes(self.shirtFinal, shoes, self.stylePicker)
        self.shoeFinal = randomItemStart(shoesArr.shoes, shoesArr.counter)
        

        var beltsArr = getBelt(self.shirtFinal, belts, self.stylePicker)
        self.beltFinal = randomItemStart(beltsArr.beltsArr, beltsArr.counter)

        var watchFaceArr = getWatchFace(self.shirtFinal, watchface, self.stylePicker)
        self.watchFaceFinal = watchFaceArr[0]

        var watchStrapArr = getStrap(self.watchFaceFinal, watchstrap, self.stylePicker)
        self.watchStrapFinal = randomItemStart(watchStrapArr.strapsArr, watchStrapArr.counter)


    console.log("Shirt: ", self.shirtFinal.name)
    console.log("Jacket: ", self.coatFinal.name)
    console.log("Pants: ", self.pantFinal.name)
    console.log("Shoes: ", self.shoeFinal.name)
    console.log("Belts: ", self.beltFinal.name)
    console.log("WatchFace: ", self.watchFaceFinal.name)
    console.log("WatchStrap: ", self.watchStrapFinal.name)
    }



    //==================This is to get objects of matching Stuff========================
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

    function getShirts(shirts,weather,style){
    var shirtsArr = []
        for(var i in shirts){
            if(shirts[i].weather.indexOf(weather) !== -1 && shirts[i].style.indexOf(style) !== -1){
                shirtsArr.unshift(shirts[i])
            }

        }
        return shirtsArr
    }

    //===========================================================================
    //==================This Generates an Array of Pants=========================
    //=============== Based off Shirt Color Style and Weather ===================
    //===========================================================================
    function getPants(shirtFinal, pants, weather, style, badColors){
        pantsArr = []
        for(var i in pants){
            if(pants[i].weather.indexOf(weather) !== -1 && pants[i].style.indexOf(style) !== -1){
                 if(badColors[shirtFinal.color].indexOf(pants[i].color) === -1){
                    pantsArr.push(pants[i]) 
                
                }
            }
            
        }
        return pantsArr
    }

    //===========================================================================
    //==================This Generates an Array of Coats=========================
    //=============== Based off Shirt Color Style and Weather ===================
    //===========================================================================
    function getCoats(shirtFinal, coats, weather, style, badColors){
    coatsArr = []
    nocoat = {image:''}
    for(var i in coats){
        if(weather === 'warm' || weather === 'hot'){
            coatsArr.push(nocoat)
            return coatsArr
        }
        else if (coats[i].weather.indexOf(weather) !== -1 && coats[i].style.indexOf(style) !== -1){
            if(badColors[shirtFinal.color].indexOf(coats[i].color) === -1){
                coatsArr.push(coats[i])
            }
        }
    }
    return coatsArr
}

    //===========================================================================
    //==================This Generates an Array of Shoes=========================
    //=================== Based off Shirt Color and Style =======================
    //===========================================================================
     function getShoes(shirt,shoes,style){
        var counter = 0
        var shoesArr = []
        for(var i in shoes){
            if(shirt.color === shoes[i].color && shoes[i].style.indexOf(style) !== -1){
                shoesArr.unshift(shoes[i])
                counter = counter + 1
            }
            else if(shoes[i].style.indexOf(style) !== -1){
                shoesArr.push(shoes[i])
            }
        }
        var shoesObj = {
            shoes: shoesArr,
            counter: counter
        }
        return shoesObj
    }

    //===========================================================================
    //==================This Generates an Array of Belts=========================
    //=================== Based off Shirt Color and Style =======================
    //===========================================================================
    var getBelt = function(shirt,belts,style){
    var beltsArr = []
    var counter = 0
    for(var i in belts){
        if(shirt.color === belts[i].color && belts[i].style.indexOf(style) !== -1){
            beltsArr.unshift(belts[i])
            counter = counter + 1
        }
        else if(belts[i].style.indexOf(style) !== -1){
            beltsArr.push(belts[i])
        }
    }
    var beltsObj = {
        beltsArr: beltsArr,
        counter: counter
    }
    return beltsObj
}


    //===========================================================================
    //==================This Generates an Array of Watches=======================
    //=================== Based off Shirt Color and Style =======================
    //===========================================================================
var getWatchFace = function( shirt, watchface, style){
    var watch = []
    for(var i in watchface){
        if(shirt.color === watchface[i].color && watchface[i].style.indexOf(style) !== -1){
            watch.unshift(watchface[i])
        }
        else if(watchface[i].style.indexOf(style) !== -1){
            watch.push(watchface[i])
        }
    }
    if(shirt.color === watch[0].color && watch.length === 2){
        return watch
    } else if (shirt.color != watch[0].color && watch.length != 1){
        var n = Math.floor(Math.random()*watch.length)
        var item = watch.splice(n, 1)
        watch.unshift(item[0])
        return watch
    }
    return watch
}

    //===========================================================================
    //==================This Generates an Array of Straps========================
    //=================== Based off watch face and Style ========================
    //===========================================================================
var getStrap = function(watchfinal,watchstrap,style){
    var x = []
    var counter = 0
    for(var i in watchstrap){
        if(watchfinal.name === 'Garmin 920'){
            x.push(watchstrap[watchstrap.length - 1])
                var strapObj = {
                strapsArr: x,
                counter: counter
                }
            return strapObj
        }
        if(watchstrap[i].model.indexOf(watchfinal.color) !== -1 && watchstrap[i].style.indexOf(style) !== -1){
            x.unshift(watchstrap[i])
            counter = counter + 1
        }
        else if(watchstrap[i].style.indexOf(style) !== -1){
            x.push(watchstrap[i])
        }
    }
    var strapObj = {
        strapsArr: x,
        counter: counter
    }
    return strapObj
}

    // ============== Function to return without a number ==========
    function randomItem(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    // ============== Function to return with a number ==========
    function randomItemStart(list,number) {
        x = number
        if(number === 0){
            x = list.length
        }
        return list[Math.floor(Math.random() * x)];
    }
    // ============== Function to get type of Weather ==========
    function tempReturn(t) {
        if(t <= 50){return "cold"}
        if(t <= 65){return "fair"}
        if(t <= 75){return "warm"}
        if(t > 75){return "hot"}
    }
    // ============== Function to get style by Day ==========
    function day(){
    var d = new Date();
    var n = d.getDay();
    if(n === 0){return "dress"} 
    else if (n === 6){return 'running'}
    else return 'casual'
}

    



}
    




}())
 