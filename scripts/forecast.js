const key = '205734dcba6581b50d120a705bf6e024';

// City information
const getCity = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  );
  const data = await res.json();

  return data;
};

getCity('Manchester');
