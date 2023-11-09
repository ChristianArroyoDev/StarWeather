const apiKey = "ee9bfee61555bcb49d21385fc40e158a";
let cityName = ''

let inputField = document.querySelector('.inp-intro')
let inputButton = document.querySelector('.heroButton')

let PlaceCityName = document.querySelector('.placeCity')
let PlaceCountName = document.querySelector('.placeCount') 
let PlaceTempName = document.querySelector('.placeTemp') 
let PalceWeaName = document.querySelector('.placeWea')
let PlacePlanetName = document.querySelector('.placePlanet') 
let description = document.querySelector('.descrip')

let planetOutView = document.querySelector('.planetImage');
let PlanetBack = document.querySelector('.planet-container');


let loaderOn = true; 

function closeLoader() {
    let loader = document.querySelector('.loading');
    loader.style.display = 'none'
    loaderOn = false
}

function callWeaApi() {
    cityName = inputField.value;

    if(loaderOn) {
        closeLoader()
        loaderOn = false
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(pue => {
        console.log(pue)

        let currentTemp = (Number(pue['main']['temp']) - 273.15).toFixed(2)
        let currentWeather = pue['weather'][0]['main']

        PlaceCityName.innerHTML = pue['name'];
        PlaceCountName.innerHTML = pue['sys']['country']
        PlaceTempName.innerHTML = `${currentTemp} °C `;
        PalceWeaName.innerHTML = currentWeather
        description.innerHTML = 'Your city is feels like:'


        if (currentWeather == 'Snow' || currentTemp < 0) {
            PlacePlanetName.innerHTML = 'Hoth'
            planetOutView.src = 'img/Hot_PImg.png'

        } else if ( currentWeather == 'Thunderstorm') {
            PlacePlanetName.innerHTML == 'Camino'
        } else if (currentWeather == 'Drizzle' || currentWeather == 'Rain' ) {
            PlacePlanetName.innerHTML = 'Dagobah'
            planetOutView.src = 'img/Dag_PImg1.png'
        } else if (currentTemp >= 30) {
            PlacePlanetName.innerHTML = 'Geonosis'
            planetOutView.src = 'img/Geo_PImg.jpg'
        } else if (currentTemp < 30 && currentTemp >= 25) {
            PlacePlanetName.innerHTML = 'Ryloth'
            planetOutView.src = 'img/Ryl_PImg.png'
        } else if (currentTemp < 25 && currentTemp >= 20) {
            PlacePlanetName.innerHTML = 'Coruscant'
            planetOutView.src = 'img/Cu_PImg.gif'
        } else if (currentTemp < 20 && currentTemp >= 10) {
            PlacePlanetName.innerHTML = 'Naboo'
            planetOutView.src = 'img/Nab_PImg.png'
            
        } 

    })

   inputField.value = ''

}
// GSAP animations
gsap.timeline().from('.hero h1', {scale:0, opacity: 0, duration: .1, ease: 'power(9)', delay:.5})
    .from('.intro', {scale:0, opacity: 0, duration: .1, ease: 'power(9)', delay:.5})
    .from('.search', {scale:0, opacity: 0, duration: .1, ease: 'power(9)', })
    .from('.planet-container', {scale:0, opacity: 0, duration: .1, ease: 'power(9)'})
    .from('.image-planet', {scale:0, opacity: 0, duration: .1, ease: 'power(9)'})
    .from('.placeCity', {scale:0, opacity: 0, duration: .1, ease: 'power(9)'})
    .from('.placeWea', {scale:0, opacity: 0, duration: .1, ease: 'power(9)'})
    .from('.placeTemp', {scale:0, opacity: 0, duration: .1, ease: 'power(9)'}, '<')
    .from('.placeCount', {scale:0, opacity: 0, duration: .1, ease: 'power(9)'})


inputButton.addEventListener('click', callWeaApi)




