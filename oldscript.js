var apikey = "e5e80f690a1de46cd1c48d028667801f";
//icon http://openweathermap.org/img/wn/${icon}.png
// icon http://openweathermap.org/img/wn/10d@2x.png

//var apikey = "d91f911bcf2c0f925fb6535547a5ddc9";

var cityArr = new Array();
$("#search-btn").on("click", searchQuery);

function searchQuery() {
  cityArr.push($("#user-input").val());
  // console.log(cityArr);
  clearCards();
  getLocation($("#user-input").val());
  //putting createButton(); in getForecast
}

function getLocation(city) { 
var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`;

fetch(requestUrl)
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(data)

  for (var daysToForcast = 0; daysToForcast < 40; daysToForcast += 8) {
    renderFcCard(data, daysToForcast, "<p>", false);
  }
  // renderFcCard(data, 0, "<h2>", true);
  createButton(data.city.name);
  getForecast(data.city.coord)
})
}

function getForecast(location) {
  //console.log(location)
  // var requestUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apikey}`
  var requestUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apikey}&units=imperial`
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      renderFcCard(data, 0, "<h2>", true);



    });
}

function createButton(location, city) {
  // var userInputEl = $("#user-input").val();
  var newButton = $("<button>");
  //newButton.text(userInputEl);
  newButton.text(city);
  newButton.on("click", () => {
    $("#user-input").val(city);
    searchQuery();
  });
  $("#history").append(newButton);
}

function renderFcCard(data, d, element, main) {
  var dataArr = [
    getDate(data, d, element),
    getIcon(data, d),
    getTemp(data, d),
    getWind(data, d),
    getHumidity(data, d),
  ];

  if (main) {
    $("#title").append($("<h2>").attr("class", "city").text(data.name));
    $("#title").append(dataArr[0]);
    $("#title").append(dataArr[1]);
    $("#today").append(dataArr[2]);
    $("#today").append(dataArr[3]);
    $("#today").append(dataArr[4]);
  } else if (d % 8 === 0) {//double check - d should always have 0 remainder from % 8
    // console.log("d");
    var fcSectionEl = $("#fc-section");
    var tempArt = $("<article>");
    tempArt.attr("id", `day${d / 8}`).addClass("fc-card");
    fcSectionEl.append(tempArt);

    for (var i = 0; i < dataArr.length; i++) {
      $(`#day${d / 8}`).append(dataArr[i]);
    }
  }
}

function getCurrentDate() {
  
}

function getCity(data) {
  return $("<h2>").attr("class", "city").text(data.city.name);
}
function getDate(data, d, element) {
  var rawD = data.list[d].dt_txt;
  var parD = rawD.split(/[\s-]/);

  return $(`${element}`)
    .attr("class", "date")
    .text("(" + parD[1] + "/" + parD[2] + "/" + parD[0] + ")");
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

function clearCards() {
  $("#today").empty();
  $("#today").append($("<span>").attr("id", "title"));
  $(`#fc-section`).empty();
}
