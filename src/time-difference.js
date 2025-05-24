function showInfo() {
  let zone = document.querySelector("#display");
  let text = "";

  const firstCityTime =
    parseInt(moment().tz(timeZoneFirstCity).format("H") * 60) +
    parseInt(moment().tz(timeZoneFirstCity).format("m")); //in minutes
  const secondtCityTime =
    parseInt(moment().tz(timeZoneSecondCity).format("H") * 60) +
    parseInt(moment().tz(timeZoneSecondCity).format("m")); //in minutes
  let timeDifference = (secondtCityTime - firstCityTime) / 60; //in hours
  console.log(timeDifference);
  if (timeDifference < 0) {
    if (Math.abs(timeDifference >= 15)) {
      text = "ahead";
    } else {
      text = "behind";
    }
  } else {
    if (timeDifference >= 15) {
      text = "behind";
    } else {
      text = "ahead";
    }
  }

  if (Math.abs(timeDifference) >= 15) {
    timeDifference = 24 - Math.abs(timeDifference);
  }
  let hoursDiff = Math.floor(Math.abs(timeDifference)); //hours difference

  let minutesDiff = (Math.abs(timeDifference) - hoursDiff) * 60; //minutes difference
  if (minutesDiff < 10) {
    minutesDiff = `0${minutesDiff}`;
  }

  zone.innerHTML = `<div
            class="row show-info border border-secondary rounded-3 m-3" style="background-color: #d5e9f7"
          ><div class="col-6 text-center pt-2 border-dark border-end">
              <h4 class="fst-italic"> ${firstCity}<small>(${countryFirstCity})</small><br/></h4>
                <span class=" fs-3 fw-bold" > ${moment()
                  .tz(timeZoneFirstCity)
                  .format("hh:mm:ss")}</span
                ><span class="fs-5 align-top" >${moment()
                  .tz(timeZoneFirstCity)
                  .format("A")}</span>
              <p> ${moment().tz(timeZoneFirstCity).format("MMMM Do, YYYY")}</p>

            </div>
            <div class=" col-6 text-center pt-2">
               <h4 class="fst-italic"> ${secondCity}<small>(${countrySecondCity})</small><br/></h4>
                <span class=" fs-3 fw-bold" > ${moment()
                  .tz(timeZoneSecondCity)
                  .format("hh:mm:ss")}</span
                ><span class="fs-5 align-top" >${moment()
                  .tz(timeZoneSecondCity)
                  .format("A")}</span>
              <p> ${moment().tz(timeZoneSecondCity).format("MMMM Do, YYYY")}</p>

 
            </div> 
            <div class=" col-12 text-center pt-2 border-dark border-top">
               <h4 class="fw-bold">
               ${secondCity} is ${hoursDiff}:${minutesDiff} hours ${text} ${firstCity}</h4>
 
            </div> 
            </div>`;
}

setInterval(showInfo, 1000);
function findTimeZoneFirstCity(response) {
  timeZoneFirstCity = response.data.timeZone;
  showInfo();
}
function findTimeZoneSecondCity(response) {
  timeZoneSecondCity = response.data.timeZone;
  showInfo();
}
function timeFirstCity(response) {
  firstCity = response.data.city;
  countryFirstCity = response.data.country;
  let latitudeFirstCity = response.data.coordinates.latitude;
  let longitudeFirstCity = response.data.coordinates.longitude;
  let apiUrl = `https://timeapi.io/api/time/current/coordinate?latitude=${latitudeFirstCity}&longitude=${longitudeFirstCity}`;
  axios.get(apiUrl).then(findTimeZoneFirstCity);
}
function timeSecondCity(response) {
  secondCity = response.data.city;
  countrySecondCity = response.data.country;
  let latitudeSecondCity = response.data.coordinates.latitude;
  let longitudeSecondCity = response.data.coordinates.longitude;
  let apiUrl = `https://timeapi.io/api/time/current/coordinate?latitude=${latitudeSecondCity}&longitude=${longitudeSecondCity}`;
  axios.get(apiUrl).then(findTimeZoneSecondCity);
}

function callWeatherApi(event) {
  event.preventDefault();
  firstCity = document.querySelector("#first-city").value;
  secondCity = document.querySelector("#second-city").value;
  let apiKey = "71c9o8ef0370bd39a326b41301fb04bt";
  let apiUrlFirstCity = `https://api.shecodes.io/weather/v1/current?query=${firstCity}&key=${apiKey}`;
  let apiUrlSecondCity = `https://api.shecodes.io/weather/v1/current?query=${secondCity}&key=${apiKey}`;
  axios.get(apiUrlFirstCity).then(timeFirstCity);
  axios.get(apiUrlSecondCity).then(timeSecondCity);
}

var firstCity = "";
var countryFirstCity = "";
var timeZoneFirstCity = "";
var secondCity = "";
var countrySecondCity = "";
var timeZoneSecondCity = "";
let formSubmit = document.querySelector("#formSubmit");
formSubmit.addEventListener("submit", callWeatherApi);
