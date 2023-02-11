// declaration
const $ = document.querySelector.bind(document);

const page = $("#page");
const locationInput = $(".location__Input");
const formInput = document.getElementById("inputForm");
const current__status = $(".current__status");
const contentWrapper = $(".contentWrapper");
const weather__current = $(".weather__current");
const toast = $("#toast");


//variable to save element
let weatherCurrentValue;
let locationInputValue;
let weatherDetailInDayArray;
let weatherDetailInWeek;
let tempCInDayArray;
let currentStatusValue;

let defaultLocationValue = "VietNam";

formInput.onsubmit  = function handleSubmit (e) 
{
    e.preventDefault();
   handleCheckWeather();
}

window.onload = function (e) {
    getData(defaultLocationValue);

}

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
            showWeatherCurrent(data);
       }
    })
    .catch((error) => 
    {
        console.log('error', error);
    })
}
function showWeatherCurrent(data) 
{
    weatherDetailInDayArray = data.forecast.forecastday[0].hour;
    showBackground(data);
    currentStatusValue = `
    <span class="current__status"> It's is  ${data.current.condition.text}.</span>
    `
    current__status.innerHTML = currentStatusValue;
    weatherCurrentValue =
        `
        <div class="weather__current">
            <span class="location___time">
                ${data.location.localtime}
            </span>
            <div class="weather__info">
                <span class="tempC">${data.current.temp_c} &deg
                </span>
                <img class="condition__icon" src="${data.current.condition.icon}">              
            </div>
                <div class="changeDeg">
                <button class="deg__Btn">
                
                    <span> &deg;</span>
                    <i class="fa-solid fa-c"></i>
                </button>
                <span>/</span>
                <button class="deg__Btn">
                    <span> &deg;</span>
                    <i class="fa-solid fa-f"></i>
                </button>
            </div>
            <span class="location__name"> ${data.location.name}</span> 
            <div class="weather__detail">
                <span class="detail__info">
                    <span class="detail__title">Wind</span>
                    <span>${data.current.wind_mph}mph</span>
                </span>
                <span class="detail__info">
                    <span class="detail__title">Humidity</span>
                    <span>${data.current.humidity}</span>
                </span>
                <span class="detail__info">
                    <span class="detail__title">UV</span>
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
        getData(value);
    }
    else 
    {
       showEmptyToast();
    }
}

function isDay(value){
    if(value == 1) return true;
    else return false;
}
function showBackground(data)
{
    if(isDay(data.current.is_day))
    {
        page.style.backgroundImage = "url('./assets/anhmay.jpg')";
        page.style.color = "#000";
    }
    else {
        page.style.backgroundImage = "url('./assets/night.jpg')";
        page.style.color = "#FFF";
    }
}