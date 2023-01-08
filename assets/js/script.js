// e5e80f690a1de46cd1c48d028667801f
//icon http://openweathermap.org/img/wn/${icon}.png
// icon http://openweathermap.org/img/wn/10d@2x.png

var apikey = "d91f911bcf2c0f925fb6535547a5ddc9";
var city = "houston";

function getWeather() {
  //var requestUrl = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`;
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);

      for (var j = 0; j < 40; j += 8) {
        weatherCard(data, j);
      }
    });
}

function weatherCard(data, d) {
  var dataArr = [
    getDate(data, d),
    getIcon(data, d),
    getTemp(data, d),
    getWind(data, d),
    getHumidity(data, d),
  ];

  for (var i = 0; i < dataArr.length; i++) {
    //console.log(d)
    //console.log(d/8)
    // console.log($(`#day${d/8}`))
    $(`#day${d / 8}`).append(dataArr[i]);
  }
}

function getCity(data) {
  return $("<p>").attr("class", "city").text(data.city.name);
}
function getDate(data, d) {
  var rawD = data.list[d].dt_txt;
  var parD = rawD.split(/[\s-]/);

  return $("<p>")
    .attr("class", "date")
    .text("(" + parD[1] + "/" + parD[2] + "/" + parD[0] + ") - " + parD[3]);
}
function getIcon(data, d) {
  icon = data.list[d].weather[0].icon;

  return $("<img>")
    .attr("class", "icon")
    .attr("src", `http://openweathermap.org/img/wn/${icon}.png`);
}
function getTemp(data, d) {
  return $("<p>")
    .attr("class", "temp")
    .text(data.list[d].main.temp + "°F");
}
function getWind(data, d) {
  return $("<p>")
    .attr("class", "wind")
    .text(data.list[d].wind.speed + " MPH");
}
function getHumidity(data, d) {
  return $("<p>")
    .attr("class", "humidity")
    .text(data.list[d].main.humidity + " %");
}

getWeather();

//function getSearch()
