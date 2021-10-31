let weather = {
  apiKey: "API",
  // array of units, which are passed to fetch link
  units: ["standard", "metric", "imperial"],

  // Fetches the weather, used api website and put in variables to change cities
  // also possible in the future to make buttons change
  // between metric,imperial systems.

  fetchWeather: function (getCity) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${getCity}&appid=${this.apiKey}&units=${this.units[1]}`
      //default units set to metric
    )
      .then((Response) => Response.json())
      .then((Data) => this.displayWeather(Data));
  },

  displayWeather: function (Data) {
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
    document.getElementById("Degrees").innerHTML = Math.round(temp) + "&#176C";
    document.getElementById("Humidity").innerHTML = humidity + "%";
    document.getElementById("Wind").innerHTML = speed + " km/h";
    document.getElementById("Pressure").innerHTML = pressure;
  },

  // Search weather, it gets the value of searchbox and
  //forwards the variable to fetchweather function
  searchWeather: function () {
    var cityName = document.getElementById("searchbox").value;
    this.fetchWeather(cityName);
  },
};
