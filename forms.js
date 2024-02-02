import { loadData } from "./weather.js";

export const initForm = () => {
    const datePicker = document.getElementById('date-input');
    const form= document.getElementById('form');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // month add back from Zero that is why we modify with +1
    const day = now.getDate();
    // get the day, year moth to made the validation in the form date picker in 
    datePicker.max =`${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    // made a submit and put the input value to console log
    form.addEventListener('submit', async e =>{
      const city= document.getElementById('city-input').value;
      const date= document.getElementById('date-input').value;
      console.log(city, date);
      loadData(city, date)
      e.preventDefault();

    });
   
}