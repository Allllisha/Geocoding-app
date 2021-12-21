import mapboxgl from 'mapbox-gl';


// TODO: Write your JS code in here
const form = document.querySelector("form");
const displayMap = document.querySelector("#map");
const displayCoordinates = document.querySelector("#coordinates");


const fetchMap = (keyword) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=pk.eyJ1IjoiYXJkb2xjZTIzIiwiYSI6ImNrd2t1cGk0ODF2dXkyc280MWJ2cDRqNHMifQ.Ctp8g31Nd6HvRAPEEIyi8Q`;
  fetch(url).then(response => response.json()).then((data) => {
    console.log(data);
    const longitude = data.features[0].geometry.coordinates[0];
    const latitude = data.features[0].geometry.coordinates[1];
    const displayC = `<p>${longitude} ${latitude}</p>`;
    displayCoordinates.insertAdjacentHTML("beforeend", displayC);

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXJkb2xjZTIzIiwiYSI6ImNrd2t1cGk0ODF2dXkyc280MWJ2cDRqNHMifQ.Ctp8g31Nd6HvRAPEEIyi8Q';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [`${longitude}`, `${latitude}`],
      zoom: 12
    });
    new mapboxgl.Marker()
      .setLngLat([`${longitude}`, `${latitude}`])
      .addTo(map);
    const displayM = `<li>${map}</li>`;
    displayMap.insertAdjacentHTML("beforeend", displayM);
  });
};


form.addEventListener("submit", (event) => {
  console.log(event);
  event.preventDefault();
  displayCoordinates.innerHTML = "";
  const input = document.querySelector("#keyword");
  fetchMap(input.value);
});
