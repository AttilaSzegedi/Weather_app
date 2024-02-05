export const addCard=(city,date,weatherData)=>{
  const container=document.getElementById('cards-container');
  console.log('from addcard js the min temp')
  console.log(weatherData.min_temp); 
  const minTemp = weatherData.min_temp;  
  console.log(minTemp);
  console.log('from addcard js the max temp')
  console.log(weatherData.max_temp);
  const maxTemp = weatherData.max_temp;
  console.log(maxTemp);
  container.insertAdjacentHTML('afterbegin', `
      <zizi-card title="${city} - ${date}">
          <div class="card-content">
              <div>${minTemp}°C</div>
              <div>${maxTemp}°C</div>
              <div>
                 <button id="delete-card">Törlés</button>
              </div>
          </div>
      </zizi-card>`)

      document.querySelector('#delete-card')
        .addEventListener('click', (e) => e.target.closest('zizi-card').remove());

}