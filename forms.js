import { loadData } from "./weather";
import { addCard } from "./card";

export const initForm = () => {
    const datePicker = document.getElementById('date-input');
    const loadingIndicator=document.getElementById('loading-indicatior');
    const errorMassage=document.getElementById('error-massage');
    const submit=document.getElementById('submit');
    const form= document.getElementById('form');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // month add back from Zero that is why we modify with +1
    const day = now.getDate();
    // get the day, year moth to made the validation in the form date picker in 
    datePicker.max =`${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    
    form.addEventListener('submit',  async e =>{
     
      const city= document.getElementById('city-input').value;
      const date= document.getElementById('date-input').value;
      console.log(city, date);
       // stop reload the DOM the default setting of the browser
       //disable to get more submit in same time...
       submit.style.disable=true;
      e.preventDefault();
      loadingIndicator.style.disable='block';
      // loading start
      // for errer massage need to have try catch block
      try {
        const weatherData = await loadData(city, date);
        console.log(weatherData.min_temp);
        console.log(weatherData.max_temp);
        addCard(city,date,weatherData);
        // reset the form for uX
        form.reset();
        
      } catch (error) {
        // it is is error show the Display bock
        //errorMassage.style.display='block';
        // automatic undisplay it after 2 sec
        //setTimeout(() => errorMassage.style.display = 'none', 2000);
      }
       // loading stop
      loadingIndicator.style.display='none';
      submit.style.disable=false;
    });
   
}