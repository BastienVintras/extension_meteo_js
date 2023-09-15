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
    document.getElementById("text_feelslike").innerHTML = Math.round(jsonData.main.feels_like)

    document.getElementById("text_desc").innerHTML = jsonData.weather[0].description

    const imageObjectURL = URL.createObjectURL(result);
    document.getElementById("icon").src = imageObjectURL
    //console.log("😀",imageObjectURL);
    
    })
})

};
navigator.geolocation.getCurrentPosition(geoSuccess);
}