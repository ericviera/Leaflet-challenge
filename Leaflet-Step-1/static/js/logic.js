// geoJSON link
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data);
// Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

function markerColor(mag) {
  if (mag <= 1) {
      return "green";} 
    else if (mag <= 2) {
      return "yellowgreen";} 
    else if (mag <= 3) {
      return "yellow";} 
    else if (mag <= 4) {
      return "orange";} 
     else if (mag <= 5) {
      return "orangered";} 
    else {
      return "darkred";}}

function markerSize(mag) {return mag * 15000;}

function createFeatures (eqData){
    var earthquakes = L.geoJSON(eqData, {onEachFeature: 
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer){
        layer.bindPopup("<h3>" + "<p>Location :"+feature.properties.place +"</p>"
        +"</h3><hr><p>" 
        + "<p> Date: "+new Date(feature.properties.time)+"</p>" + "</p>"
        + "<p> Magnitude: "+ feature.properties.mag+ "</p>"
        + "<p> Depth of Earth: "+feature.geometry.coordinates[2]+"</p>");}, 
        pointToLayer: function (feature, latlng) {
        return new L.circle(latlng,
            {radius: markerSize(feature.properties.mag),
            fillColor: markerColor(feature.properties.mag),
            fillOpacity: 1,
            stroke: false})}});
    
//-------------------------------------------------------------------
/*     // Sending our earthquakes layer to the createMap function
    createMap(earthquakes); */
//--------------------------------------------------------------------
    // Basic Map
    var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [earthquakes]});

    var streetMap=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);
    
    
    // Variables for layer Control 
    var base = {Streetmap: streetMap};
    var overlayMaps = {Earthquakes: earthquakes};

    // Create a layer control
    // Pass in streetmap and overlayMaps
    // Add the layer control to the map
    L.control.layers(base,overlayMaps, {
        collapsed: false
    }).addTo(myMap);
};

//-----------------------------------------------------------------
// Adding Legend

 /* var legend = L.control({position: "bottomright"});

  legend.onAdd = function () {
   var div = L.DomUtil.create("div", "info legend");

 
    var colors = ["green","yellowgreen","yellow", "orange", "orangered", "red" ]
    var labels = []

    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'

      return div;
  }
  
  legend.addTo(myMap); */

    



//-------------------------------------------------------------------------------------------------------------------------------
// Extra to add more layers


/* function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 6,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
 */
