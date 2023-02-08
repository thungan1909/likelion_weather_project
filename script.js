// declaration
const $ = document.querySelector.bind(document);


const locationInput = $(".location__Input");
const checkBtn = $(".checkBtn");
const weatherWrapper = $(".weather__wrapper");
const weatherTitle = $(".weather__title");


//
let locationInputValue;

//variable to save data from api
let dataCurrent, dataLocation, dataForecast;

//variable to save element
let dataBody;
let weatherTitleValue;


checkBtn.addEventListener("click", handleCheckWeather);


//function


//function to handle check weather
function handleCheckWeather() 
{   
    locationInputValue = locationInput.value;
    validateInput(locationInput);
    
}

//function to get data from api
function getData() 
{
    const response = fetch(`http://api.weatherapi.com/v1/current.json?key=4acb30f8960e480c96131445230802&q=${locationValue}&aqi=no`);
    response.then(res => res.json())
    .then((data) => isExistLocation(data));
}

//function to show location 
function showLocation (dataLocation)
{
    weatherTitleValue = ` 
                            <span>${dataLocation.name}</span>
                            <span>Weather Forecast</span>
                        `;
    weatherTitle.innerHTML += weatherTitleValue;

}

//function to check whether location exist or not
function isExistLocation(data)
{
    dataLocation = data.location;
    if (dataLocation != null) 
    {
        showLocation(dataLocation);
        return true;
    }
    return false;
}

//function to check value is empty or not
function checkEmptyValue (value) 
{

    if (value === "") {
        return false;
      } else {
        return true;
      }

    // if(value === "") 
    // {
    //     return true;
    // }
    // else 
    // {
    //     return false;
    // }
}

//function to validate input
function validateInput() 
{
    if(checkEmptyValue) 
    {
        console.log("Not empty");
       if (!isExistLocation) 
       {
        console.log("Not exist location");
       }
    }
    else 
    {
        console.log("Empty value");
    }
}



// function showTimeZone(data) {
//     dataCurrent = data.current;
   
//     dataForecast = data.dataForecast;

//     weatherTitleValue = ` 
//                         <span>${dataLocation.name}</span>
//                         <span>Weather Forecast</span>
//                     `;
//     weatherTitle.innerHTML += weatherTitleValue;
// }
