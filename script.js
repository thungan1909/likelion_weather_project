// declaration
const $ = document.querySelector.bind(document);


const locationInput = $(".location__Input");
const checkBtn = $(".checkBtn");
const contentWrapper = $(".contentWrapper");
const weather__current = $(".weather__current");
const toast = $("#toast");


// const weatherWrapper = $(".weather__wrapper");
// const weatherTitle = $(".weather__title");



//variable to save element
let weatherCurrentValue;
let locationInputValue;


//
let defaultLocationValue = "VietNam";




checkBtn.addEventListener("click", handleCheckWeather);
window.onload = function (e) {
    getData(defaultLocationValue);
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
    const response = fetch(`http://api.weatherapi.com/v1/current.json?key=4acb30f8960e480c96131445230802&q=${value}&aqi=no`);
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
    weatherCurrentValue =
        `
        <div class="weather__current">
            <span class="tempC">${data.current.temp_c} &deg;</span>
           <div class="weather_info">
                <div class="location">
                    <span class="location__name">
                        ${data.location.name}
                    </span> 
                    <span class="location___time">
                        ${data.location.localtime}
                    </span>
                </div>
                <div class="condition">
                    <img class="condition__icon" src="${data.current.condition.icon}">
                    <span class="condition__status">${data.current.condition.text}</span>
                </div>
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

