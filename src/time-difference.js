function showInfo() {
  let text = "";
  
  // zone.innerHTML = "";
  const firstCityTime =
    parseInt(moment().tz(timeZoneFirstCity).format("H") * 60) +
    parseInt(moment().tz(timeZoneFirstCity).format("m")); //in minutes
  const secondtCityTime =
    parseInt(moment().tz(timeZoneSecondCity).format("H") * 60) +
    parseInt(moment().tz(timeZoneSecondCity).format("m")); //in minutes
  let timeDifference = (secondtCityTime - firstCityTime) / 60; //in hours
  console.log(timeDifference);
  if (timeDifference < 0) {
    if (timeDifference <= -12) {
      text = "ahead";
    } else {
      text = "behind";
    }
  } else {
    if (timeDifference >= 12) {
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
  zone.classList.remove("loading");
  zone.innerHTML = `<div
            class="row show-info-difference border border-secondary rounded-3 " style="background-color: #d5e9f7"
          ><div class="col-md-6 text-center pt-2 borders">
              <h4 class="fst-italic"> ${firstCity}<small>(${countryFirstCity})</small><br/></h4>
                <span class=" fs-3 fw-bold" > ${moment()
                  .tz(timeZoneFirstCity)
                  .format("hh:mm:ss")}</span
                ><span class="fs-5 align-top" >${moment()
                  .tz(timeZoneFirstCity)
                  .format("A")}</span>
              <p> ${moment().tz(timeZoneFirstCity).format("MMMM Do, YYYY")}</p>

            </div>
            <div class=" col-md-6 text-center pt-2">
               <h4 class="fst-italic"> ${secondCity}<small>(${countrySecondCity})</small><br/></h4>
                <span class=" fs-3 fw-bold" > ${moment()
                  .tz(timeZoneSecondCity)
                  .format("hh:mm:ss")}</span
                ><span class="fs-5 align-top" >${moment()
                  .tz(timeZoneSecondCity)
                  .format("A")}</span>
              <p> ${moment().tz(timeZoneSecondCity).format("MMMM Do, YYYY")}</p>

 
            </div> 
            <div class=" col-md-12 text-center pt-2 border-dark border-top">
               <h4 class="fw-bold">
               ${secondCity} is ${hoursDiff}:${minutesDiff} hours ${text} ${firstCity}</h4>
 
            </div> 
            </div>`;
}

setInterval(showInfo, 1000);
function findTimeZoneFirstCity(response) {
  timeZoneFirstCity = response.data.zoneName;
  showInfo();
}
function findTimeZoneSecondCity(response) {
  timeZoneSecondCity = response.data.zoneName;
  showInfo();
}
function timeFirstCity(response) {
  firstCity = response.data.city;
  countryFirstCity = response.data.country;
  let latitudeFirstCity = response.data.coordinates.latitude;
  let longitudeFirstCity = response.data.coordinates.longitude;
  let apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=41JCT95F3RS6&format=json&by=position&lat=${latitudeFirstCity}&lng=${longitudeFirstCity}`;
  axios.get(apiUrl).then(findTimeZoneFirstCity);
}
function timeSecondCity(response) {
  secondCity = response.data.city;
  countrySecondCity = response.data.country;
  let latitudeSecondCity = response.data.coordinates.latitude;
  let longitudeSecondCity = response.data.coordinates.longitude;
  let apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=41JCT95F3RS6&format=json&by=position&lat=${latitudeSecondCity}&lng=${longitudeSecondCity}`;

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
  zone.classList.add("loading");
}

var firstCity = "";
var countryFirstCity = "";
var timeZoneFirstCity = "";
var secondCity = "";
var countrySecondCity = "";
var timeZoneSecondCity = "";
var zone = document.querySelector("#display");
let formSubmit = document.querySelector("#formSubmit");
formSubmit.addEventListener("submit", callWeatherApi);
