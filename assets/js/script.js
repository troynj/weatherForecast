//var apikey = "e5e80f690a1de46cd1c48d028667801f"
//icon http://openweathermap.org/img/wn/${icon}.png
// icon http://openweathermap.org/img/wn/10d@2x.png

var apikey = "d91f911bcf2c0f925fb6535547a5ddc9";

 var cityArr = new Array();
$('#search-btn').on('click', searchQuery)

function searchQuery() {
    cityArr.push($('#user-input').val())
    console.log(cityArr)
    clearCards()
    getForecast($('#user-input').val());
    createButton()
    
}

function createButton() {
    var userInputEl = $('#user-input').val()
    var newButton = $('<button>')
    newButton.text(userInputEl)
    newButton.on("click", () => { 
        $('#user-input').val(userInputEl)
        searchQuery()
    });
    $('#history').append(newButton)
}



function getForecast(city) {
  //var requestUrl = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`;
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);

      for (var daysToForcast = 0;  daysToForcast < 40; daysToForcast += 8) {
        renderFcCard(data, daysToForcast, "<p>", false);
      }
      renderFcCard(data, 0, "<h2>", true);
    });
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
    $("#title").append(getCity(data));
    $("#title").append(dataArr[0]);
    $("#title").append(dataArr[1]);
    $("#today").append(dataArr[2]);
    $("#today").append(dataArr[3]);
    $("#today").append(dataArr[4]);
  } else {
    for (var i = 0; i < dataArr.length; i++) {
      //console.log(d)
      //console.log(d/8)
      // console.log($(`#day${d/8}`))
      $(`#day${d / 8}`).append(dataArr[i]);
    }
  }
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
    $("#today").append($('<span>').attr("id", "title"));
    
        for (var i = 0; i < 5; i++) {
          //console.log(d)
          //console.log(d/8)
          // console.log($(`#day${d/8}`))
          $(`#day${i}`).empty();
        }
      
}
