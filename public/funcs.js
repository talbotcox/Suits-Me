//----------------------------------------------------------------------------------------------------------
//------------------------------------------ THE GET SHOES FUNCTION ----------------------------------------
//----------------------------------------------------------------------------------------------------------
var getShoes = function(shirt,shoes,style){
	var shoesArr = []
	for(var i in shoes){
		if(shirt.color === shoes[i].color && shoes[i].style.indexOf(style) !== -1){
			shoesArr.unshift(shoes[i])
		}
		else if(shoes[i].style.indexOf(style) !== -1){
			shoesArr.push(shoes[i])
		}
	}
	return shoesArr
}

//Shirt needs to be added and style needs to be added
getShoes(shirts[8],shoes,'dress')



//----------------------------------------------------------------------------------------------------------
//------------------------------------------ THE GET BELT FUNCTION -----------------------------------------
//----------------------------------------------------------------------------------------------------------
var getbelt = function(shirt,belts,style){
	var x = []
	for(var i in belts){
		if(shirt.color === belts[i].color && belts[i].style.indexOf(style) !== -1){
			x.unshift(belts[i])
		}
		else if(belts[i].style.indexOf(style) !== -1){
			x.push(belts[i])
		}
	}
	console.log(x)
}

//Shirt needs to be added and style needs to be added
getbelt(shirts[8],belts,'dress')



//----------------------------------------------------------------------------------------------------------
//------------------------------------- THE GET Watch & Strap FUNCTION -------------------------------------
//----------------------------------------------------------------------------------------------------------
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

//Shirt needs to be added and style needs to be added
var watchfinal = getWatchFace(shirts[8], watchface ,'running')


var getStrap = function(watchfinal,watchstrap,style){
	var x = []
	var y = []
	for(var i in watchstrap){
		if(watchfinal.name === 'Garmin 920'){
			x.push(watchstrap[watchstrap.length - 1])
			return x
		}
		if(watchstrap[i].model.indexOf(watchfinal.color) !== -1 && watchstrap[i].style.indexOf(style) !== -1){
			x.unshift(watchstrap[i])
		}
		else if(watchstrap[i].style.indexOf(style) !== -1){
			x.push(watchstrap[i])
		}
	}
	return x
}

//Watch Final needs to be added and style needs to be added
getStrap(watchfinal[0],watchstrap,'running')

