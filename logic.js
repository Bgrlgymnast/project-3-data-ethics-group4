//initialize leaflet.js library and display it from "openstreetmap.org"
var map = L.map('map', {
    center: [39.82, -98.57], // set coordinates for map
    zoom: 5 //set zoom level
});

// create tile layer with "addTo" to add objects to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
    { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

// let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let marker = L.marker(state);

for k, v in State:
    State.map(State:)

// //get geojson data
// d3.json(url).then(function(data) {
//     L.geoJson(data, {
//         style: function (feature) {
//             return {
//                 color: "white",
//                 fillColor: chooseColor(feature.geometry.coordinates[2]),
//                 fillOpacity: 0.,
//                 weight: 1.5

//             }
//         },
//         onEachFeature: function (feature, layer) {
//             layer.on({
//                 mouseover: function (event) {
//                     layer = event.target;
//                     layer.setStyle({
//                         fillOpacity: 0.9
//                     })
//                 },
//                 mouseout: function (event) {
//                     layer = event.target;
//                     layer.setStyle({
//                         fillOpacity: 0.5
//                     })
//                 },
//                 click: function (event) {
//                     myMap.fitBounds(event.target.getBounds());
//                 }
//             });
//             layer.bindPopup(
//                 "<h1>" + feature.geometry.coordinates[2] + "</h1><h2> " + feature.population + "</ > "
//             );
//         }
//     }).addTo(myMap);
// });


