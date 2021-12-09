var lastLatitude, lastLongitude;

let weather = {
  apiKey: "API",
  // array of units, which are passed to fetch link
  units: ["standard", "metric", "imperial"],

  // Fetches the weather, used api website and put in variables to change cities
  // also possible in the future to make buttons change
  // between metric,imperial systems.

  fetchWeather: function (getCity) {
    try {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${getCity}&appid=${this.apiKey}&units=${this.units[1]}`
        //default units set to metric
      )
        .then((Response) => Response.json())
        .then((Data) => this.displayWeather(Data));
    } catch {
      console.log("ERROR in fetchWeather");
    }
  },

  setProperties: function (Data) {
    try {
      // After fetching the weather, this function displays only certain
      //JSON properties of the API and logs them in console.
      const { name } = Data;
      const { main } = Data.weather[0];
      const { temp, humidity, pressure } = Data.main;
      const { speed } = Data.wind;

      console.log(name, main, temp, humidity, speed, pressure);

      // Every single element of HTML is changed according to the
      // information given by the API.
      document.getElementById("City").innerHTML = name;
      document.getElementById("Weathertype").innerHTML = main;
      document.getElementById("Degrees").innerHTML =
        Math.round(temp) + "&#176C";
      document.getElementById("Humidity").innerHTML = humidity + "%";
      document.getElementById("Wind").innerHTML = speed + " km/h";
      document.getElementById("Pressure").innerHTML = pressure;
    } catch {
      console.log("ERROR in displayWeather");
      console.log(Data);
    }
  },

  displayWeather: function (Data) {
    let counter = 0;

    console.log("Finding..");

    this.setProperties(Data);

    while (counter < 3) {
      if (Data.cod == "404" || Data.cod == "400") {
        // if Data returns 404 code, that city is not found, return county instead
        //if that is not found, then state and so on..

        //made a new function that is fetchcounty, but now if the county is not found
        // it just goes on an infinite loop
        // need to find a way to override fetchlocation and displaylocation
        // to not duplicate code
        console.log("Finding next location...");

        map.fetchCounty(lastLatitude, lastLongitude);
      }
      if (Data.cod == "401") {
        console.log("Incorrect or nonexisting API key");
      }
      counter++;
    }
  },

  searchWeather: function () {
    var cityName = document.getElementById("searchbox").value;
    this.fetchWeather(cityName);
  },
};

// Geolocation
let map = {
  //This function displays the latitue and longitude using geolocation API

  currentCoords: function () {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      // if succesful, logs the latitute and longitude
      var crd = pos.coords;

      latitude = pos.coords.latitude;
      longitude = pos.coords.longitude;

      console.log("Success");
      console.log("Your current coords:");
      console.log(`Latitude: ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);

      map.fetchLocation(crd.latitude, crd.longitude); //fetch function with coords as params
    }

    function error(err) {
      console.log("Failed");
      weather.fetchWeather("Riga");
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  },

  fetchLocation: function (lat, lon) {
    lastLatitude = lat;
    lastLongitude = lon;

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )
      .then((Response) => Response.json())
      .then((Data) => this.displayLocation(Data));
  },

  fetchCounty: function (lat, lon) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )
      .then((Response) => Response.json())
      .then((Data) => this.countyLocation(Data));
  },

  countyLocation: function (Data) {
    const county = Data.address.county;
    weather.fetchWeather(county);
  },

  displayLocation: function (Data) {
    const cityName = Data.address.city;

    console.log(cityName);
    weather.fetchWeather(cityName);
  },
};

let darkmode = {
  buttonpressed: function myfunction() {
    var el = document.querySelector(".card");
  },
};
