let btn = document.querySelector('.search');
let input = document.querySelector('#city');
displayWeather();

class City
{
    constructor(name,min,max,feel,weather,vis)
    {
        this.name = name;
        this.min = min;
        this.max = max;
        this.feel = feel;
        this.weather = weather;
        this.vis = vis;
    }
}

//creating a function to fetch the data from the api
var city;
function getWeatherData()
{
    
}

btn.addEventListener('click',function(e)
{
    let weatherObj;
    let wetString = localStorage.getItem('weather');

    if(wetString == null)
    {
        weatherObj = [];

    }
    else
    {
        weatherObj = JSON.parse(wetString);
    }

    //fetching the data

    url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=c409414ab03a53b01b56c3a1e517732f`
    fetch(url)
    .then(function(resp){return resp.json()})
    .then(function(data){
        var error = document.querySelector('.error');
        error.innerHTML = ``;
        var name = data['name']
        var min = data['main']['temp_min']
        var max = data['main']['temp_max']
        var feel = data['main']['feels_like']
        var vis = data['visibility']
        var weather = data['weather'][0]['description']

        city = new City(name,min,max,feel,weather,vis)  // new city object
        
        //pushing to created array
        weatherObj.push(city);
        localStorage.setItem('weather',JSON.stringify(weatherObj));
        displayWeather(); // upadating local storage
    })
    .catch(function()
    {
       console.log('error city');
       var error = document.querySelector('.error');
       error.innerHTML = `<h3>"Please Enter a valid city!"</h3>`;
    })

    
    
    input.value = '';
    
})

// making function to display the result cards

function displayWeather()
{
    let weatherObj;
    let wetString = localStorage.getItem('weather');

    if(wetString == null)
    {
        weatherObj = [];

    }
    else
    {
        weatherObj = JSON.parse(wetString);
    }

    let html ='';

    weatherObj.forEach(function(element,index)
    {
         if(index %2 ==0)
         {
             html+=` <div class="result-card even" id = '${index}' onclick = deleteCity(this.id)>
             <h3 id="city-heading">${element.name}</h3>
             <ul class="info">
                 <li class="winfo">Min temp: ${(element.min-273.15).toFixed(2)}&#8451</li>
                 <li class="winfo">Max temp: ${(element.max-273.15).toFixed(2)}&#8451</li>
                 <li class="winfo">Feelslike: ${(element.feel-273.15).toFixed(2)}&#8451</li>
                 <li class="winfo">Weather: ${element.weather}</li>
                 <li class="winfo">visibility: ${element.vis/1000} km</li>
             </ul>
             
         </div>`
        }
         else
         {
             html += ` <div class="result-card" id = '${index}' onclick = deleteCity(this.id)>
             <h3 id="city-heading">${element.name}</h3>
             <ul class="info">
                 <li class="winfo">Min temp: ${(element.min-273.15).toFixed(2)}&#8451</li>
                 <li class="winfo">Max temp: ${(element.max-273.15).toFixed(2)}&#8451</li>
                 <li class="winfo">Feelslike: ${(element.feel-273.15).toFixed(2)}&#8451</li>
                 <li class="winfo">Weather: ${element.weather}</li>
                 <li class="winfo">visibility: ${element.vis/1000} km</li>
             </ul>
             
         </div>`
         }
    })

    let weatherinfo = document.querySelector('.weather-info');

    if(weatherObj.length != 0)
    {
        weatherinfo.innerHTML = html;
    }
    else
    {
        weatherinfo.innerHTML  = `<h3>Search a city!</h3>`
    }
    
}


// creating a function to delete a search
function deleteCity(index)
{
    let weatherObj;
    let wetString = localStorage.getItem('weather');

    if(wetString == null)
    {
        weatherObj = [];

    }
    else
    {
        weatherObj = JSON.parse(wetString);
    }
    
    let val = confirm("Are you sure, you want to delete the weather for this city?")

    if(val == 1)
    {

        weatherObj.splice(index,1);
    }
    else
    {
        console.log('ok');
    }
    localStorage.setItem('weather',JSON.stringify(weatherObj));

    displayWeather();
}


