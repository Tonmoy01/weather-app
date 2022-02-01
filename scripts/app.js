const body = document.querySelector('body');
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  const cityDetails = data.cityDetails;

  const { name, weather, main, wind } = cityDetails;

  const temp = main.temp - 273.15;

  // Update details
  details.innerHTML = `
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <h5 class="my-3">Weather in ${name}</h5>
      </li>
      <li class="list-group-item my-3 font-weight-bold">${weather[0].main}</li>
      <li class="list-group-item">
        <div class="display-4 my-4">
          <span>${temp.toFixed(0)}</span>
          <span>&deg;C</span>
        </div>
      </li>
      <li class="list-group-item">
        <span>Humidity ${main.humidity}%</span>
      </li>
      <li class="list-group-item">
        <span>Wind Speed ${wind.speed}km/h</span>
      </li>
    </ul>
  `;

  // Updte image and icon
  const iconSrc = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  icon.setAttribute('src', iconSrc);

  body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${weather[0].main}')`;

  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);

  return {
    cityDetails,
  };
};

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update the UI with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((error) => console.log(error));
});
