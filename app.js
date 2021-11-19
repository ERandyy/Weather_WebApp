let weather = {
  apiKey: "API", 
  // array of units, which are passed to fetch link
  units: ["standard", "metric", "imperial"],

  // Fetches the weather, used api website and put in variables to change cities
  // also possible in the future to make buttons change
  // between metric,imperial systems.

  fetchWeather: function (getCity) 
  {
    try{
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${getCity}&appid=${this.apiKey}&units=${this.units[1]}`
      //default units set to metric
    )
      .then((Response) => Response.json())
      .then((Data) => this.displayWeather(Data));
  }
  catch{console.log("ERROR in fetchWeather")}
},


setProperties: function(Data)
{

  try{
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
    }
    catch{console.log("ERROR in displayWeather")
  console.log(Data)}
},

  displayWeather: function (Data){

    console.log("Finding..");
    this.setProperties(Data);
  
  if(Data.cod=="404") 
  // if Data returns 404 code, that city is not found, return county instead
  //if that is not found, then state and so on..
  {
    console.log("Finding next location...")
    
    


    

  }
},






  // Search weather, it gets the value of searchbox and
  //forwards the variable to fetchweather function
  searchWeather: function () {
    var cityName = document.getElementById("searchbox").value;
    this.fetchWeather(cityName);
  },
};

// Geolocation
let map = {
 


  

  //This function displays the latitue and longitude using geolocation API
  //Created new var that contains coord properties and display it on console
  // Currently the default function upon loading the page
  
  currentCoords: function () { 
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) { // if succesful, logs the latitute and longitude
      var crd = pos.coords;

      console.log("Success");
      console.log("Your current coords:");
      console.log(`Latitude: ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);

      map.fetchLocation(crd.latitude, crd.longitude); //fetch function with coords as params
    }

    function error(err) {
      console.log("Failed");
      weather.fetchWeather('Riga')
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  },

  fetchLocation: function (lat, lon) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )
      .then((Response) => Response.json())
      .then((Data) => this.displayLocation(Data));
  },


  // Sometimes the location doesn't display due to city names of openstreetmap do not
  // match on what can be found on openweather map
  // city location was returned as "Malpils pagasts" instead of "Malpils". "Malpils" works, but if cut
  //out the part of string after Malpils, it does same for differnet city names 
  //where there is a name with space between.
  // Works okay with larger cities, but has problem with small towns
  //
  displayLocation: function(Data)
  {
    const cityName=Data.address.city;
    const county=Data.address.county;
    const state=Data.address.state;
    
    
    console.log(cityName);
    weather.fetchWeather(cityName);
    

    fetchCounty(Data)
    {
    console.log(county);
    weather.fetchWeather(county);
    }


    

    
   
  },






};


let darkmode =

  {

   buttonpressed: function myfunction()
    {
      var el = document.querySelector(".card")
     
    }


  };

