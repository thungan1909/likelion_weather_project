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
function handleSubmit (e) 
{
    e.preventDefault();
    console.log(locationInput.value);
}
formInput.onsubmit(e) = handleSubmit(e);

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
            
            //showWeatherCurrent(data);
       }
    })
    .catch((error) => 
    {
        console.log('error', error);
    })
}

function getWeatherByHour(data)
{
    weatherDetailInDayArray = data.forecast.forecastday[0];
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

