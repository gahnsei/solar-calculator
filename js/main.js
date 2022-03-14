/*jslint browser:true */
"use strict";

const addMonths = (id) => {
  let annualUseKw = 0;
  let months = document.querySelector(id).getElementsByTagName(`input`);

  for (let i = 0; i < months.length; i++) {
    annualUseKw += +months[i].value;
  }

  return annualUseKw / 365;
};

const sunHours = () => {
  let hrs;
  let theZone = document.getElementsByName(`zone`)[0].selectedIndex + 1;

  switch (theZone) {
    case 1:
      hrs = 6;
      break;
    case 2:
      hrs = 5.5;
      break;
    case 3:
      hrs = 5;
      break;
    case 4:
      hrs = 4.5;
      break;
    case 5:
      hrs = 4.2;
      break;
    case 6:
      hrs = 3.5;
      break;
    default:
      hrs = 0;
  }
  return hrs;
};

const calculateSolar = () => {
  let sunHoursPerDay = sunHours();
  let dailyUseKw = Math.round(addMonths(`#mpc`));
  let minKwNeeds = dailyUseKw / sunHoursPerDay
  let realKwNeeds = minKwNeeds * 1.25
  let realWattNeeds = Math.round(realKwNeeds * 1000)
  let {power, name} = calculatePanel()
  let panelsNeeded = Math.ceil(realWattNeeds / power)

  document.querySelector(`#feedback`).innerHTML = `
  <p>Based on your avereage daily use of ${dailyUseKw} kWh, you will need to purchase ${panelsNeeded} ${name} solar panels to offset 100% of your total energy needs.</p>
  <h2>Additonal Details</h2>
  <p>Your average daily electricity consumption: ${dailyUseKw} Kwh per day.</p>
  <p>Average sunshine hours per day: ${sunHoursPerDay} hours</p>
  <p>Realistic watts needed per hour: ${realWattNeeds} watts/hour.</p>
  <p>The ${name} panel you selected generates about ${power} watts per hour.</p>
  `
};

const calculatePanel = () => {
    let userChoice = document.getElementsByName(`panel`)[0].selectedIndex
    let power = document.getElementsByName(`panel`)[0].value
    let name = document.getElementsByName(`panel`)[0].options[userChoice].textContent
    return {name, power}
}


document.querySelector(`button`).addEventListener(`click`, calculateSolar)