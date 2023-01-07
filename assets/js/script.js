// e5e80f690a1de46cd1c48d028667801f
//icon http://openweathermap.org/img/wn/${icon}.png
// icon http://openweathermap.org/img/wn/10d@2x.png

var apikey = "d91f911bcf2c0f925fb6535547a5ddc9";
var city = "houston";
var myDay = dayjs();

function getWeather() {
    //var requestUrl = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`
    fetch(requestUrl)
    .then((response) => {
            return response.json()
    })
    .then((data) => {
        console.log("data", data)
        weatherCard(data, 0)

    })
}

function weatherCard(data) {
    var dataArr = [getCity(data), getDate(), getIcon(data, 0), getTemp(data, 0), getWind(data, 0)]
    
    for(var i = 0; i <dataArr.length; i++) {
    $("#forecast").append(dataArr[i])
    }
    
    


}

function getCity(data) {   return $("<p>").attr("class", "city").text(data.city.name)
}
function getDate() {   return $("<p>").attr("class", "date").text("(" + myDay.format('MM/DD/YY') + ")")
}
function getIcon(data, i) {    
    icon = data.list[i].weather[i].icon
    
    return $("<p>").attr("class", "icon").attr("src", `http://openweathermap.org/img/wn/${icon}.png` )
}
function getTemp(data, i) {   return $('<p>').attr("class", "temp").text(data.list[i].main.temp + "°F")
}
function getWind(data, i) {   return $('<p>').attr("class", "wind").text(data.list[i].wind.speed + " MPH")
}
function getHumidity(data, i) {    return $('<p>').attr("class", "humidity").text(data.list[i].main.humidity + " %")
}

getWeather()

//function getSearch()