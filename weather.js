
export const loadData = async (city, date) => {
    try {
                const coordinates = await getCoordinates(city);
        const weatherInfo = await getWeatherInfo(citydata, date);
        return weatherInfo;
    } catch (e) {
        console.error('Error loading weather data', e);
        throw e;
    }
}

const citydata = {
    name:'',
    long:'',
    lat:''
};// declear the emtpy Json for put the response in it

// get the geo code base upon the input valu of city field and get response in async to rasponse json and put ti citydate Json
const getCoordinates = async (city) => {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
            if (response.status !== 200) {
                throw 'Error loading weather data';
           }
            const jsonResponse = await response.json();
            citydata.name=citydata.results[0].name;
            citydata.lat=citydata.results[0].latitude;
            citydata.long=citydata.results[0].longitude;
            console.log(`responsjson name value: `+ jsonResponse.results[0].name);
            console.log(`responsjson lat value: `+ jsonResponse.results[0].latitude);
            console.log(`responsjson lon value: `+ jsonResponse.results[0].longitude);
            console.log(`citydata json name value: `+ citydata.name);
            console.log(`citydata json lat value: `+ citydata.lat);
            console.log(`citydata json lon value: `+ citydata.long);
}

// based upon the lat and lon value ask the wether infor and put into response.json
const getWeatherInfo = async (citydata, date) => {
    
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${citydata.lat}&longitude=${citydata.lon}&daily=apparent_temperature_max,apparent_temperature_min&timezone=Europe/Budapest`);
    if (response.status !== 200) {
        throw 'Error loading weather data';
    }
    const jsonResponse = await response.json();


    // Megkeressük, hogy melyik dátumra keres a felhasználó
    const dateIndex = jsonResponse.daily.time.findIndex(d => d === date);
    console.log(dateIndex);
    // A megadott dátumhoz tartozó min és max hőmérsékletet visszaadjuk
    const result = {min_temp: jsonResponse.daily.apparent_temperature_min[dateIndex], max_temp: jsonResponse.daily.apparent_temperature_max[dateIndex]}
    return result;
}