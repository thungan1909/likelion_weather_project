// declaration
const $ = document.querySelector.bind(document);

const page = $("#page");
const locationInput = $(".location__Input");
const formInput = document.getElementById("inputForm");
const current__status = $(".current__status");
const contentWrapper = $(".contentWrapper");
const weatherCurrent = $(".weather__current");
const weatherDetail = $(".weather__detail");
const cardWrapper = $(".cardWrapper");
const degC__Btn = $(".degC__Btn");
const degF__Btn = $(".degF__Btn");
const toast = $("#toast");
//
const locationTime = $(".location___time");
const weatherTemperature = $(".weather__temperature");
const tempIcon = $(".temp__icon");
const conditionIcon = $(".condition__icon");
const locationName = $(".location__name");


//variable to save element
let weatherCurrentValue;
let locationInputValue;
let defaultLocationValue = "VietNam";


let weatherDetailInDayArray;


let currentStatusElement;
let weatherDetailElement;
let cardWrapperElement;
let weatherCurrentElement;


let degIcon = "&degC";
let degValue;

// const labels = Utils.months({count: 7});
// const datas = {
//   labels: labels,
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.1
//   }]
// };
var options = {
    series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
    chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
    dataLabels: {
        style: {
        colors: ['#F44336', '#E91E63', '#9C27B0']
        }
    },
    theme: {
        monochrome: {
          enabled: true,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
      },
  stroke: {
    curve: 'smooth'
  },
  dropShadow: {
    enabled: true,
    top: 0,
    left: 0,
    blur: 3,
    opacity: 0.5
  },
  fill: {
    type: 'gradient' / 'solid' / 'pattern' / 'image'
  },
//   fill: {
//     type: 'pattern',
//     pattern: {
//       style: 'verticalLines',
//       width: 6,
//       height: 6,
//       strokeWidth: 2
//     }
//   },
//   fill: {
//     colors: ['#F44336', '#E91E63', '#9C27B0']
//   },

  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
formInput.onsubmit  = function handleSubmit (e) 
{
    e.preventDefault();
   handleCheckWeather();
}
degC__Btn.addEventListener("click", changeDegToC);
degF__Btn.addEventListener("click", changeDegToF);

window.onload = function (e) {
  getData(defaultLocationValue);
}

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
            // console.log(data.forecast.forecastday[0].astro.sunrise);
            showWeatherCurrent(data);
           showWeatherDetail(data);
       }
    })
    .catch((error) => 
    {
        console.log('error', error);
    })
}
function showWeatherDetail(data)
{
    weatherDetailInDayArray = data.forecast.forecastday[0].hour;
                weatherDetailElement =  `
                
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
                <span class="detail__info">
                    <span class="detail__title">Real Feel</span>
                    <span>${data.current.uv}</span>
                </span>
            `;
            weatherDetail.innerHTML = weatherDetailElement;
            // cardWrapperElement = `
            // <div class="card__detail">
            // <span class="card__time">0:00</span>
            // <img class="card__icon" src="${weatherDetailInDayArray[0].condition.icon}" />
            // <span class="card__tempC">${weatherDetailInDayArray[0].temp_c}&deg;</span>
            // <span class="card__status">${weatherDetailInDayArray[0].condition.text}</span>
            // </div>
            // <div class="card__detail">
            // <span class="card__time">4:00</span>
            // <img class="card__icon" src="${weatherDetailInDayArray[4].condition.icon}" />
            // <span class="card__tempC">${weatherDetailInDayArray[4].temp_c}&deg;</span>
            // <span class="card__status">${weatherDetailInDayArray[4].condition.text}</span>
            // </div>
            // <div class="card__detail">
            // <span class="card__time">8:00</span>
            // <img class="card__icon" src="${weatherDetailInDayArray[8].condition.icon}" />
            // <span class="card__tempC">${weatherDetailInDayArray[8].temp_c}&deg;</span>
            // <span class="card__status">${weatherDetailInDayArray[8].condition.text}</span>
            // </div>
            // <div class="card__detail">
            // <span class="card__time">12:00</span>
            // <img class="card__icon" src="${weatherDetailInDayArray[12].condition.icon}" />
            // <span class="card__tempC">${weatherDetailInDayArray[12].temp_c}&deg;</span>
            // <span class="card__status">${weatherDetailInDayArray[12].condition.text}</span>
            // </div>
            // <div class="card__detail">
            // <span class="card__time">16:00</span>
            // <img class="card__icon" src="${weatherDetailInDayArray[16].condition.icon}" />
            // <span class="card__tempC">>${weatherDetailInDayArray[16].temp_c}&deg;</span>
            // <span class="card__status">${weatherDetailInDayArray[16].condition.text}</span>
            // </div>
            // <div class="card__detail">
            // <span class="card__time">20:00</span>
            // <img class="card__icon" src="${weatherDetailInDayArray[20].condition.icon}" />
            // <span class="card__tempC">>${weatherDetailInDayArray[20].temp_c}&deg;</span>
            // <span class="card__status">${weatherDetailInDayArray[20].condition.text}</span>
            // </div>`;
            // cardWrapper.innerHTML = cardWrapperElement;
}
function showWeatherCurrent(data) 
{
 
    // showBackground(data);
    degValue = data.current.temp_c;
   currentStatusElement = `<span class="current__status"> It's is  ${data.current.condition.text}.</span>  `;
   current__status.innerHTML = currentStatusElement ;

    locationTime.innerHTML = `${data.location.localtime}`;
    weatherTemperature.innerHTML = `${degValue}`;
    tempIcon.innerHTML = `${degIcon}`;
    conditionIcon.src =    `${data.current.condition.icon}`;
    locationName.innerHTML = `${data.location.name}`;
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
                message:   `This input is empty. Please try again`
            }
        )
}
function showNotChangeDegToast() {
    handleToast (
        {
            message:   `Sorry, we can't change to ${degIcon}`
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


function changeDegToF() {

    if (degIcon === "&degC")
    {
        degValue = Math.round((degValue * 1.8) + 32);
        degIcon = "&degF";
        weatherTemperature.innerHTML = `${degValue}`;
        tempIcon.innerHTML = `${degIcon}`;
    }
    else {
        showNotChangeDegToast();
    }
    
}
function changeDegToC () {

    if(degIcon === "&degF")
    {
        degValue= Math.round((degValue-32) / 1.8);
        degIcon = "&degC";
        weatherTemperature.innerHTML = `${degValue}`;
        tempIcon.innerHTML = `${degIcon}`;
    }
    else {
        showNotChangeDegToast();
    }
}