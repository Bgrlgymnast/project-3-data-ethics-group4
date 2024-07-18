function createMap(illnessMap) {
    // create tile layer with "addTo" to add objects to the map
    let usmap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
        { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
    });

    let baseMaps = {
        "US Map": usmap
    }
    
    let overLayMaps = {
        "Illnesses": illnessMap
    }
    
    let map = L.map('map', {
        center: [39.82, -98.57], // set coordinates for map
        zoom: 5 //set zoom level
        // layers: [usmap, illnessMap]
    });

    L.control.layers(baseMaps,overLayMaps, {
        collapsed: false
    }).addTo(map);

}

function createMarkers(response){

    let state = response.features;

    let illnessMarkers = []

    state.forEach(state => {
        let lat = state.geometry.coordinates[1];
        let lon = state.geometry.coordinates[0];

        let stateName = state.properties.state;
        let covidDeaths = state.properties["covid-19_deaths"] || 0;
        let pneumoniaDeaths = state.properties["pneumonia_deaths"] || 0;
        let influenzaDeaths = state.properties["influenza_deaths"] || 0;
        let totalDeaths = state.properties["total_deaths"] || 0;

        L.marker([lat, lon]).bindPopup(
            "State: " + feature.properties.state + "<br>Covid-19 Deaths: " + feature.properties["covid-19_deaths"] + "<br>Pneumonia Deaths: " + feature.properties.pneumonia_deaths + "<br>Influenza Deaths: " + feature.properties.influenzad_deaths + "<br>Total Deaths: " + feature.properties.total_deaths
        );
        
        illnessMarkers.push(illnessMarkers);
    });

    createMap(L.layerGroup(illnessMarkers));
}

d3.json("leaflet/js/clean_us_pop.geojson").then(createMarkers);

// //initialize leaflet.js library and display it from "openstreetmap.org"
//     var 
// });




// let response = "leaflet/js/clean_us_pop.geojson";

//     // Get GeoJSON Data
//     d3.json(response).then(function (data) {
//         console.log(data);
//         createFeatures(data.features);

//         L.geoJson(data{
//             //create pointToLayer
//             pointToLayer: function(features, latlng){
//                 return L.marker(latlng);
//             },

//         })
        
//         function L.marker(features.geometry.coordinates[2]);
//         L.geoJson(deaths), {
            

//         });




//     // function createFeatures(deaths) {
//     //     function onEachFeature (feature, layer) {
//     //         console.log(feature);
//     //         layer.bindPopup(
//     //             
//     //     }

//     let marker = L.marker(features.geometry.coordinates[2]);
//     L.geoJson(deaths), {
//         //create pointToLayer
//         pointToLayer: function (features, latlng) {
//             return L.marker(latlng);
//         }
//     }
// };



//     //     //get markersize base in earthquake
//     //     function markerSize(magnitude) {
//     //         return magnitude * 3;
//     //     };

//     //     //get marker color based on earthquake size
//     //     function chooseColor(depth) {
//     //         if (depth > 90)
//     //             return "#e34a33";
//     //         else if (depth > 70)
//     //             return "#fdbb84";
//     //         else if (depth > 50)
//     //             return "#feb24c";
//     //         else if (depth > 30)
//     //             return "#fec44f";
//     //         else if (depth > 10)
//     //             return "#d4e34f";
//     //         else return "#75d417";
//     //     };
//     //     //create styleFunction
//     //     function styleFunction(feature) {
//     //         return {
//     //             radius: markerSize(feature.properties.mag),
//     //             fillColor: chooseColor(feature.geometry.coordinates[2]),
//     //             fillOpacity: 0.8,
//     //             weight: 0.5,
//     //             color: "black"
//     //         }
//     //     }

//     //     
//     //         },
//     //         style: styleFunction,
//     //         //create onEachFeature
//     //         onEachFeature: function (feature, layer) {
//     //             //create bindPopup layer
//     //             layer.bindPopup(
//     //                 "State: " + feature.properties.state + "<br>Covid-19 Deaths: " + feature.properties.covid-19_deaths + "<br>Pneumonia Deaths: " + feature.properties.pneumonia_deaths "<br>Influenza Deaths: " + feature.properties.influenza_deaths"<br>Total Deaths: " + feature.properties.influenza_deaths
//     //             );
//     //         }
//     //     }).addTo(map);

//     //     //create and positon legend
//     //     var legend = L.control({ position: "bottomright" });

//     //     legend.onAdd = function () {

//     //         var div = L.DomUtil.create('div', 'info legend');
//     //         grades = [-10, 10, 30, 50, 70, 90];
//     //         colors = ["#75d417", "#d4e34f", "#fec44f", "#feb24c", "#fdbb84", "#e34a33"];


//     //         // loop through our density intervals and generate a label with a colored square for each interval
//     //         for (var i = 0; i < grades.length; i++) {
//     //             div.innerHTML +=
//     //                 '<i style="background:' + (colors[i]) + '"></i> ' +
//     //                 grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     //         }

//     //         return div;
//     //     };

//     //     //Add legend to map.
//     //     legend.addTo(map)
    
//     });

// for (let i = 0; i < state.length; i++) {

//     let states = states[i] // cities[3]

//     let illnessMarkers = L.marker([state.lat, state.lon]).bindPopup(
//         "State: " + features.properties.state + "<br>Covid-19 Deaths: " + features.propertie["covid-19_deaths"] + "<br>Pneumonia Deaths: " + features.properties.Pneumonia_Deaths + "<br>Influenza Deaths: " + features.properties.Influenzad_Deaths + "<br>Total Deaths: " + features.properties.Total_Deaths)
    
//     illnessMarkers.push(illnessMarkers)