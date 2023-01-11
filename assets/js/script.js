var apikey = "e5e80f690a1de46cd1c48d028667801f";
var cityArr = new Array();

$("#search-form").submit(() => {
  event?.preventDefault();

  $("#user-input").val() && searchQuery();
});

function searchQuery() {
  clearData();
  cityArr.push($("#user-input").val());
  getForecast($("#user-input").val());
  $("#user-input").val("");
}

function clearData() {
  $("#today").empty();
  $("#today").append($("<span>").attr("id", "title"));
  $("#fc-section").empty();

}

//gives access to location
function getForecast(city) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`;

  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      createButton(city);
      for (var day = 0; day < 40; day += 8) {
        forecastWeather(data, day)
      }
      getCurrent(data.city.coord);
    });
}

function getCurrent(location) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apikey}&units=imperial`;
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      currentWeather(data);
    });
}

function forecastWeather(data, day) {
  var dataArr = [
    //getDate(data, day),
    getIcon(data, day),
    getTemp(data, day),
    getWind(data, day),
    getHumidity(data, day),
  ];

  var fcSectionEl = $("#fc-section");
  var tempArt = $("<article>");
  tempArt.attr("id", `day${day / 8}`).addClass("fc-card");
  fcSectionEl.append(tempArt);

  for (var i = 0; i < dataArr.length; i++) {
    $(`#day${day / 8}`).append(dataArr[i]);
  }
}

function currentWeather(data) {

  var currentDate = new Date(data.dt)
  console.log(currentDate)
  console.log(currentDate.toLocaleString("GMT"))
  var cityEl = $("<h2>").text(data.name);
  var dateEl = $("<h2>").text(data.dt);
  var icon = data.weather[0].icon;
  var iconEl = $("<img>")
    .attr("class", "icon")
    .attr("src", `http://openweathermap.org/img/wn/${icon}.png`);
  // console.log(data.weather[0].icon);
  $("#title").append(cityEl, dateEl, iconEl);
}

function createButton(city) {
  var newButton = $("<button>").text(city);
  newButton.click((event) => {
    $("#user-input").val(city);
    searchQuery();
    event.target.remove();
  });
  $("#history").prepend(newButton);
}

function getCity(data) {
  return $("<h2>").attr("class", "city").text(data.city.name);
}
// function getDate(data, d, element) {
//   var rawD = data.list[d].dt_txt;
//   var parD = rawD.split(/[\s-]/);

//   return $(`${element}`)
//     .attr("class", "date")
//     .text("(" + parD[1] + "/" + parD[2] + "/" + parD[0] + ")");
// }
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
