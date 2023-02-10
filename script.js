// declaration
const $ = document.querySelector.bind(document);


const locationInput = $(".location__Input");
// const checkBtn = $(".checkBtn");

const formInput = document.getElementById("inputForm");

const contentWrapper = $(".contentWrapper");
const weather__current = $(".weather__current");
const toast = $("#toast");


//variable to save element
let weatherCurrentValue;
let locationInputValue;
let weatherDetailInDayArray;
let weatherDetailInWeek;
let tempCInDayArray;


//
let defaultLocationValue = "VietNam";

// var xValues = [50,60,70,80,90,100,110,120,130,140,150];
// var yValues = [7,8,8,9,9,9,10,11,14,14,15];

// new Chart("temperChart", {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [{
//       fill: false,
//       lineTension: 0,
//       backgroundColor: "red",
//       borderColor: "red",
//       data: yValues
//     }]
//   },
//   options: {
//     legend: {display: false},
//     scales: {
//       yAxes: [{ticks: {min: 6, max:16}}],
//     }
//   }
// });
// checkBtn.addEventListener("click", handleCheckWeather);

formInput.onsubmit  = function handleSubmit (e) 
{
    e.preventDefault();
   handleCheckWeather();
}

window.onload = function (e) {
    // getData(defaultLocationValue);

}

//function



//function to handle check weather
function handleCheckWeather() 
{   
    locationInputValue = locationInput.value;
    validateInput(locationInputValue);
    
}

//function to get data from api
function getData(value) 
{
    const response = fetch(`http://api.weatherapi.com/v1/forecast.json?key=4acb30f8960e480c96131445230802&q=${value}&days=10&aqi=yes&alerts=no`);
    response.then(res => res.json())
    .then((data) =>
    {
        if(data.error)
        {
            showNotExistToast(value);
        }
       else
       {
           // console.log(data);
           // getWeatherByHour(data);
            
            showWeatherCurrent(data);
       }
    })
    .catch((error) => 
    {
        console.log('error', error);
    })
}

function getWeatherByHour(data)
{
   
    for(let i = 0; i <= weatherDetailInDayArray.hour.length; i++)
    {
        console.log(weatherDetailInDayArray.hour[i].temp_c);
    }
    // console.log(weatherDetailInDayArray);
    // for (let i = 0; i <= arr.length; i++) 
    // {
    //     console.log(arr[i].temp_c);
    // }
}
function showWeatherCurrent(data) 
{
    weatherDetailInDayArray = data.forecast.forecastday[0].hour;
    console.log(weatherDetailInDayArray);
    // console.log(weatherDetailInWeek);
    weatherCurrentValue =
        `
        <div class="weather__current">
            <span class="location___time">
                ${data.location.localtime}
            </span>
            <div class="weather__info">
                <span class="tempC">${data.current.temp_c} &deg;</span>
                <img class="condition__icon" src="${data.current.condition.icon}">
            </div>
            <span class="location__name"> ${data.location.name}</span> 
            <div class="weather__detail">
                <span class="detail__info">Wind
                    <span>${data.current.wind_mph}mph</span>
                </span>
                <span class="detail__info">Humidity
                    <span>${data.current.humidity}</span>
                </span>
                <span class="detail__info">UV
                    <span>${data.current.uv}</span>
                </span>
            </div>
        </div> 

        <div class="cardWrapper">
            <div class="card__detail">
                <span class="card__time">0:00</span>
                <img class="card__icon" src="${weatherDetailInDayArray[0].condition.icon}" />
                <span class="card__tempC">${weatherDetailInDayArray[0].temp_c}&deg;</span>
                <span class="card__status">${weatherDetailInDayArray[0].condition.text}</span>
            </div>
            <div class="card__detail">
                <span class="card__time">4:00</span>
                <img class="card__icon" src="${weatherDetailInDayArray[4].condition.icon}" />
                <span class="card__tempC">${weatherDetailInDayArray[4].temp_c}&deg;</span>
                <span class="card__status">${weatherDetailInDayArray[4].condition.text}</span>
            </div>
            <div class="card__detail">
                <span class="card__time">8:00</span>
                <img class="card__icon" src="${weatherDetailInDayArray[8].condition.icon}" />
                <span class="card__tempC">${weatherDetailInDayArray[8].temp_c}&deg;</span>
                <span class="card__status">${weatherDetailInDayArray[8].condition.text}</span>
            </div>
            <div class="card__detail">
                <span class="card__time">12:00</span>
                <img class="card__icon" src="${weatherDetailInDayArray[12].condition.icon}" />
                <span class="card__tempC">${weatherDetailInDayArray[12].temp_c}&deg;</span>
                <span class="card__status">${weatherDetailInDayArray[12].condition.text}</span>
            </div>
            <div class="card__detail">
                <span class="card__time">16:00</span>
                <img class="card__icon" src="${weatherDetailInDayArray[16].condition.icon}" />
                <span class="card__tempC">>${weatherDetailInDayArray[16].temp_c}&deg;</span>
                <span class="card__status">${weatherDetailInDayArray[16].condition.text}</span>
            </div>
            <div class="card__detail">
                <span class="card__time">20:00</span>
                <img class="card__icon" src="${weatherDetailInDayArray[20].condition.icon}" />
                <span class="card__tempC">>${weatherDetailInDayArray[20].temp_c}&deg;</span>
                <span class="card__status">${weatherDetailInDayArray[20].condition.text}</span>
            </div>
        </div>
        `;
    contentWrapper.innerHTML = weatherCurrentValue;
}

function handleToast({message}) {


    const toastValue = document.createElement('div');
    //Auto remove toast
    const autoRemoveID = setTimeout(function () {
        toast.removeChild(toastValue);
    },4000);

    toastValue.onclick = function (e) {
        if (e.target.closest('.toast__close')) {
            toast.removeChild(toastValue);
            clearTimeout(autoRemoveID); //để settimeout kh chạy nữa
        }
    }
    toastValue.classList.add('toastWrapper');
    toastValue.innerHTML = `
                   
                        <div class="toast__icon">
                             <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div class="toast__body">
                            <h3 class="toast__title">Error</h3>
                            <p class="toast__msg">${message}</p>
                        </div>
                        <div class="toast__close">
                            <i class="fas fa-times-circle"></i>
                        </div>
                 
                `;

    toast.appendChild(toastValue);
}
function showNotExistToast(value) {
    handleToast(
        {
            message:    `Not exist ${value}. Please try another location again.`,
        }
    );
}
function showEmptyToast() {
        handleToast (
            {
                message:   `This input is empty`
            }
        )
}

//function to check value is empty or not
function checkEmptyValue (value) 
{

    if (value === "") 
    {
            return true;
    }
    else
    {
        return false;
    }
      
}

//function to validate input
function validateInput(value) 
{
    if(!checkEmptyValue(value)) 
    {
        getData(value)
    }
    else 
    {
       showEmptyToast();
    }
}

