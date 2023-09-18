const API_key = "ba06a1668166095e20a160c8f4c3ed32"



window.onload = function(){
    let startPos;
    let geoSuccess =function(position) {
    startPos = position

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=
${startPos.coords.latitude}&lon=${startPos.coords.longitude}&units=metric&appid=${API_key}&lang=fr`)
.then((data)=>data.json())

.then((jsonData)=> {
// console.log(jsonData)
//récupère les données de l'API souhaitées
fetch(` https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`)
    .then((res)=>res.blob())
    .then((result)=>{
    
    document.getElementById("text_location").innerHTML = jsonData.name
    document.getElementById("text_location_country").innerHTML = jsonData.sys.country
//Math.round : arrondi le chiffre de la temperature
    document.getElementById("text_temp").innerHTML = Math.round(jsonData.main.temp)
    document.getElementById("text_temp_min").innerHTML = Math.round(jsonData.main.temp_min)
    document.getElementById("text_temp_max").innerHTML = Math.round(jsonData.main.temp_max)
    document.getElementById("text_feelslike").innerHTML = Math.round(jsonData.main.feels_like)

    document.getElementById("text_desc").innerHTML = jsonData.weather[0].description

    const imageObjectURL = URL.createObjectURL(result);
    document.getElementById("icon").src = imageObjectURL
    //console.log("😀",imageObjectURL);
    
    const timestampInSeconds = jsonData.sys.sunrise; // Example timestamp
    const timestampInSecond2 =jsonData.sys.sunset    
    // Convert Unix timestamp to milliseconds
    const timestampInMilliseconds = timestampInSeconds * 1000;
    const timestampInMilliseconds2 = timestampInSecond2 * 1000
    // Create a JavaScript Date object
    const sunrise = new Date(timestampInMilliseconds);
    const heure1 = sunrise.getHours()
    const minutes1 = sunrise.getMinutes()
    
    const sunset = new Date(timestampInMilliseconds2);
    const heure2 = sunset.getHours()
    const minutes2 =sunset.getMinutes()
    
    
    
    document.getElementById("text_sunrise").innerHTML = `${heure1}:${minutes1}`
    document.getElementById("text_sunset").innerHTML =  `${heure2}:${minutes2}`
    })
})

};
navigator.geolocation.getCurrentPosition(geoSuccess);

}