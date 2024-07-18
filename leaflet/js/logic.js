//initialize leaflet.js library and display it from "openstreetmap.org"
var map = L.map('map', {
    center: [38.67, -100.07], // set coordinates for map
    zoom: 5 //set zoom level
});

// create tile layer with "addTo" to add objects to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
    { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);