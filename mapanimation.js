mapboxgl.accessToken = 'pk.eyJ1IjoiZmx5bWFybGEiLCJhIjoiY2t2cjEwcngwN216ajJwbXNlY2J1d2g2MCJ9.1c4hqu3Yh2U1F9fFlVVSFA';

// set up map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-71.08, 42.349],
  zoom: 13
});

const currentMarkers = [];
// get bus data 
async function run(){   
const locations = await getBusLocations();
console.log(new Date());
//console.log(locations);
//console.log(locations.length);

//Pull in stops data to an array
var setOfStops = [];
  for (let i=0; i<locations.length; i++) {
    const stopNum = locations[i];
    const stopLat = stopNum.attributes.latitude;
    const stopLon = stopNum.attributes.longitude;
    setOfStops.push([stopLon,stopLat]);
  }
// console.log(setOfStops);

// Adds stops to map

for (let j =0; j<setOfStops.length; j++) {
  const el = document.createElement('div');
  el.className = 'marker';
  const marker = new mapboxgl.Marker(el)
    .setLngLat(setOfStops[j])
    .addTo(map);
    currentMarkers.push(marker);
};

};
run();

// sets timer, removes old markers, adds new ones
function move() {
  setTimeout(() => {
    for (let k =0; k<currentMarkers.length; k++) {
      currentMarkers[k].remove();
    }
    run();
    move();
  }, 15000);
};

move();

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
};


