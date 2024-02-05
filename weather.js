
export const loadData = async (city, date) => {
    try {
        console.log(`city value from weather`+ city)
        const citydata = await getCoordinates(city);
        const weatherInfo = await getWeatherInfo(citydata, date);
        return weatherInfo;
    } catch (e) {
        console.error('Error loading weather data', e);
        throw e;
    }
}



// get the geo code base upon the input valu of city field and get response in async to rasponse json and put ti citydate Json
const getCoordinates = async (city) => {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
            if (response.status !== 200) {
                throw 'Error loading weather data';
           }
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            
            console.log(`responsjson name value: `+ jsonResponse.results[0].name);
            console.log(`responsjson lat value: `+ jsonResponse.results[0].latitude);
            console.log(`responsjson lon value: `+ jsonResponse.results[0].longitude);
           
       const citydata = {
            name:'',
            long:'',
             lat:''
            };// declear the emtpy Json for put the response in it

            // full fill the citydata json with name and lang lot value
            citydata.name=jsonResponse.results[0].name;
            console.log(`citydata json name value from getCoordinates: `+ citydata.name);
            citydata.lat=jsonResponse.results[0].latitude;
            console.log(`citydata json lat value from getCoordinates: `+ citydata.lat);
            citydata.long=jsonResponse.results[0].longitude;
            console.log(`citydata json lon value from getCoordinates: `+ citydata.long);
  return citydata;
  // give city data to other functions
}

// based upon the lat and lon value ask the wether infor and put into response.json
const getWeatherInfo = async (citydata, date) => {
    console.log(`citydata json name value from getWeatherinfo: `+ citydata.name);
    console.log(`citydata json lat value from getWeatherinfo: `+ citydata.lat);
    console.log(`citydata json lon value from getWeatherinfo: `+ citydata.long);
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${citydata.lat}&longitude=${citydata.long}&daily=apparent_temperature_max,apparent_temperature_min&timezone=Europe/Budapest`);
    if (response.status !== 200) {
        throw 'Error loading weather data';
    }
    const jsonResponse = await response.json();
    console.log(`weather response from open-meteo: `);
    console.log(jsonResponse);
    // search for input date in json object
    const dateIndex = jsonResponse.daily.time.findIndex(d => d === date);
    console.log(dateIndex);
    // based upon selected date add bach of the values of min max
      const result = {min_temp: jsonResponse.daily.apparent_temperature_min[dateIndex], max_temp: jsonResponse.daily.apparent_temperature_max[dateIndex]}
       console.log(result.min_temp);
       console.log(result.max_temp)
      return result;
}