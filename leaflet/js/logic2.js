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

        let illnessMarker = L.marker([lat, lon]).bindPopup(
            "State: " + state.properties["STATE"] + "<br>Covid-19 Deaths: " + state.properties["COVID-19 Deaths"] + "<br>Pneumonia Deaths: " + state.properties["Pneumonia Deaths"] + "<br>Influenza Deaths: " + state.properties["Influenza Deaths"] + "<br>Total Deaths: " + state.properties["Total Deaths"]
        );
        
        illnessMarkers.push(illnessMarker);
    });

    createMap(L.layerGroup(illnessMarkers));
}

d3.json("leaflet/js//clean_us_pop.geojson").then(createMarkers);
