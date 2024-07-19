//initialize leaflet.js library and display it from "openstreetmap.org"
var map = L.map('map', {
    center: [38.67, -100.07], // set coordinates for map
    zoom: 4 //set zoom level
});

// create tile layer with "addTo" to add objects to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
    { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

//get GeoJSON
d3.json("leaflet/js//clean_us_pop.geojson").then(function (data) {
    L.geoJSON(data, {
        //create onEachFeature and layer bindPop
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<b>State: </b>" + feature.properties["STATE"] + "<br><b>Covid-19 Deaths: </b>" + feature.properties["COVID-19 Deaths"] + "<br><b>Pneumonia Deaths: </b>" + feature.properties["Pneumonia Deaths"] + "<br><b>Influenza Deaths: </b>" + feature.properties["Influenza Deaths"] + "<br><b>Total Deaths: </b>" + feature.properties["Total Deaths"]
            );
        },
        //create pointToLayer
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {  
            //Create mouse over  
            }).on('mouseover', function(){
                this.bindPopup("<b>State: </b>" + feature.properties["STATE"] + "<br><b>Covid-19 Deaths: </b>" + feature.properties["COVID-19 Deaths"] + "<br><b>Pneumonia Deaths: </b>" + feature.properties["Pneumonia Deaths"] + "<br><b>Influenza Deaths: </b>" + feature.properties["Influenza Deaths"] + "<br><b>Total Deaths: </b>" + feature.properties["Total Deaths"]
            ).openPopup();
            //Create mouseout
            }).on("mouseout", function(){
                this.bindPopup("<b>State: </b>" + feature.properties["STATE"] + "<br><b>Covid-19 Deaths: </b>" + feature.properties["COVID-19 Deaths"] + "<br><b>Pneumonia Deaths: </b>" + feature.properties["Pneumonia Deaths"] + "<br><b>Influenza Deaths: </b>" + feature.properties["Influenza Deaths"] + "<br><b>Total Deaths: </b>" + feature.properties["Total Deaths"]
            ).closePopup();
            });
        }

    //add onEachFeature and PointTolayers to map
    }).addTo(map);
});
