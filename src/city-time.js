
function showInfo() {
 
  zone.innerHTML = `<div
          class="row show-info-singleCity  border border-secondary  rounded-3 " style="background-color: #d5e9f7"
        ><div class="col-md-6 borders text-center pt-4 ">
            <h3 class="fst-italic"> ${
              searchInput.charAt(0).toUpperCase() + searchInput.slice(1)
            },${country} <br/><span class="fs-4">(${timeZone})</span></h3>
          </div>
          <div class=" col-md-6 text-center pt-4">
            <h1>
              <span class="fw-bold" > ${moment()
                .tz(timeZone)
                .format("hh:mm:ss")}</span
              ><span class="fs-3 align-top" >${moment()
                .tz(timeZone)
                .format("A")}</span>
            </h1>
<p> ${moment().tz(timeZone).format("MMMM Do, YYYY")}</p>
          </div></div>`;
          zone.classList.remove("loading");
}
setInterval(showInfo, 1000);
function findTimeZone(response) {
  timeZone = response.data.zoneName;
  showInfo()
  
}

function callTimeApi(response) {
  if (response.data.message === "City not found") {
    alert("Please enter correct city name!");
  } else {
    let latitude = response.data.coordinates.latitude;
    let longitude = response.data.coordinates.longitude;
    country = response.data.country;
    let apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=41JCT95F3RS6&format=json&by=position&lat=${latitude}&lng=${longitude}`;
    
    axios.get(apiUrl).then(findTimeZone);
  }
}

function callWeatherApi(event) {
  event.preventDefault();
  searchInput = document.querySelector("#input-search").value;
  let apiKey = "71c9o8ef0370bd39a326b41301fb04bt";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput}&key=${apiKey}`;
  axios.get(apiUrl).then(callTimeApi);
  
    zone.classList.add("loading");
  
  
  
}

var searchInput = "";
var country = "";
var timeZone = "";
let formSubmit = document.querySelector("#formSubmit");
var zone = document.querySelector("#display");
formSubmit.addEventListener("submit", callWeatherApi);
