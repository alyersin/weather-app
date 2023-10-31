const getCity = document.querySelector(".city-search");

getCity.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    const getLocation = async (id) => {
      try {
        //GEOLOCATION API
        const res = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${id}&count=10&language=en&format=json`
        );
        let currLoc = res.data.results[0];
        console.log(res.data.results);
        const {
          name: cityName,
          country: countryName,
          latitude: lat,
          longitude: long,
        } = currLoc;
        //WEATHER API
        const res1 = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloudcover,pressure_msl,surface_pressure,windspeed_10m,winddirection_10m,windgusts_10m`
        );
        //`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,rain,snowfall,surface_pressure,cloudcover,relativehumidity_2m,precipitation,precipitation_probability,,windspeed_10m,winddirection_10m,windgusts_10m,uv_index,is_day&current_weather=true`

        console.log(res1.data);
        let currWeather = res1.data;
        let hourlyWeather = res1.data.hourly;

        //CURRENT WEATHER

        const {
          current: {
            temperature_2m: currTemp,
            windspeed_10m: windSpeed,
            winddirection: windDirection,
            relativehumidity_2m: humidity,
          },
        } = currWeather;

        document.querySelector(
          ".city"
        ).innerText = `${cityName}, ${countryName}`;
        document.querySelector(".temp").innerText = `${currTemp}°C`;

        //HUMIDITY
        document.querySelector(".humidity").innerText = `${humidity}%`;

        //WINDSPEED * DIRECTION
        function wind() {
          const windSp = document.querySelector(".wind");
          const windDir = document.querySelector(".wind-direction");
          windSp.innerText = `${windSpeed} km/h`;

          //   if (windDirection > 0 && windDirection < 45) {
          //     windDir.innerText = "NNE";
          //   } else if (windDirection > 45 && windDirection < 90) {
          //     windDir.innerText = "ENE";
          //   } else if (windDirection > 90 && windDirection < 135) {
          //     windDir.innerText = "ESE";
          //   } else if (windDirection > 135 && windDirection < 180) {
          //     windDir.innerText = "SSE";
          //   } else if (windDirection > 180 && windDirection < 225) {
          //     windDir.innerText = "SSW";
          //   } else if (windDirection > 225 && windDirection < 270) {
          //     windDir.innerText = "WSW";
          //   } else if (windDirection > 270 && windDirection < 315) {
          //     windDir.innerText = "WNW";
          //   } else if (windDirection > 315 && windDirection < 360) {
          //     windDir.innerText = "NNW";
          //   }
        }
        wind();
        //CATCH ERROR
      } catch (e) {
        console.log("ERROR", e);
      }
    };
    getLocation(getCity.value);
  }
});
