//GEOLOCATION & WEATHER API (JSON)

const getCity = document.querySelector("city-search");

getCity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
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
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,rain,snowfall,surface_pressure,cloudcover,relativehumidity_2m,precipitation,precipitation_probability,,windspeed_10m,winddirection_10m,windgusts_10m,uv_index,is_day&current_weather=true`
        );

        console.log(res1.data);
        let currWeather = res1.data;
        let hourlyWeather = res1.data.hourly;

        //CURRENT WEATHER
        const {
          current_weather: {
            temperature: currTemp,
            windspeed: windSpeed,
            winddirection: windDirection,
          },
        } = currWeather;

        document.querySelector(
          ".city"
        ).innerText = `${cityName}, ${countryName}`;

        // if (long < 0) {
        //   document.querySelector(".coordinates").innerText = ` ${lat.toFixed(
        //     2
        //   )}N /  ${long.toFixed(2)}W`;
        // } else if (long > 0) {
        //   document.querySelector(".coordinates").innerText = ` ${lat.toFixed(
        //     2
        //   )} N /  ${long.toFixed(2)} E`;
        // }

        document.querySelectorAll(".temp").innerText = `${currTemp}°C`;

        //HOURLY WEATHER
        const {
          apparent_temperature: realFeel,
          cloudcover: cloudCover,
          is_day: dayNight,
          time: time,
        } = hourlyWeather;

        const timeObj = time.reduce((acc, curr, index) => {
          acc[curr] = `${realFeel[index]}, ${cloudCover[index]}`;
          return acc;
        }, {});
        console.log(timeObj);

        getCity.value = "";

        //WINDSPEED * DIRECTION

        function wind() {
          const windSp = document.querySelector(".wind");
          const windDir = document.querySelector(".wind-direction");
          windSp.innerText = `${windSpeed} km/h`;

          if (windDirection > 0 && windDirection < 45) {
            windDir.innerText = "NNE";
          } else if (windDirection > 45 && windDirection < 90) {
            windDir.innerText = "ENE";
          } else if (windDirection > 90 && windDirection < 135) {
            windDir.innerText = "ESE";
          } else if (windDirection > 135 && windDirection < 180) {
            windDir.innerText = "SSE";
          } else if (windDirection > 180 && windDirection < 225) {
            windDir.innerText = "SSW";
          } else if (windDirection > 225 && windDirection < 270) {
            windDir.innerText = "WSW";
          } else if (windDirection > 270 && windDirection < 315) {
            windDir.innerText = "WNW";
          } else if (windDirection > 315 && windDirection < 360) {
            windDir.innerText = "NNW";
          }
        }
        wind();
        //TIMEZONE API
        // const res2 = await axios.get(
        //   `https://api.ipgeolocation.io/timezone?apiKey=dda0da9b52624e0c80f4972ad83865e2&lat=${lat}&long=${long}`
        // );
        // console.log(res2.data);

        // let rawTime = res2.data.date_time;
        // let currTime = rawTime.split("").splice(11, 5).join("");

        // let [hours, minutes] = currTime
        //   .split(":")
        //   .map((component) => parseInt(component));
        // if (hours >= 12) {
        //   document.querySelector(".time").innerText = `${currTime} PM`;
        // } else {
        //   document.querySelector(".time").innerText = `${currTime} AM`;
        // }

        // console.log(currTime);

        // let splitHour = parseInt(currTime.split(":")[0], 10);
        // let sun = document.querySelector(".sun");
        // let moon = document.querySelector(".moon");

        // if (splitHour >= 20) {
        //   sun.classList.remove("hidden");
        //   moon.classList.remove("hidden");
        // } else if (splitHour >= 06) {
        //   sun.classList.remove("hidden");
        //   moon.classList.add("hidden");
        // }

        //LOOPING ARRAY FROM WEATHER API
        // let date = rawTime.split("").splice(0, 10).join("");
        // let hour = rawTime.split("").splice(11, 2).join("");
        // let dateTime = date.concat("T").concat(hour);

        // for (let key in timeObj) {
        //   let splitKey = key.split("").splice(0, 13).join("");
        //   // console.log(splitKey);
        //   if (dateTime === splitKey) {
        //     document.querySelector(".real-feel").innerText = `RealFeel ${
        //       timeObj[key].split(",")[0]
        //     }°`;
        //     let cloudySunny = document.querySelector(".cloudySunny");
        //     let cloudCover = timeObj[key].split(",")[1];
        //     if (cloudCover > 0 && cloudCover <= 20) {
        //       cloudySunny.innerText = "Sunny";
        //     } else if (cloudCover > 20 && cloudCover <= 30) {
        //       cloudySunny.innerText = "Mostly Sunny";
        //     } else if (cloudCover > 30 && cloudCover <= 60) {
        //       cloudySunny.innerText = "Partly Cloudy";
        //     } else if (cloudCover > 60 && cloudCover <= 70) {
        //       cloudySunny.innerText = "Partly Sunny";
        //     } else if (cloudCover > 70 && cloudCover <= 90) {
        //       cloudySunny.innerText = "Mostly Cloudy";
        //     } else {
        //       cloudySunny.innerText = "Overcast";
        //     }
        //   }
        // }
      } catch (e) {
        console.log("ERROR", e);
      }
    };
    getLocation(getCity.value);
  }
});
