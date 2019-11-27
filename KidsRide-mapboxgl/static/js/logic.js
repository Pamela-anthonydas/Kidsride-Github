// // Creating map object
// var myMap = L.map("map", {
//   center: [40.7, -73.95],
//   zoom: 11
// });

// // Adding tile layer to the map
// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// }).addTo(myMap);

mapboxgl.accessToken = "pk.eyJ1IjoiaGFpcGFtZWxhIiwiYSI6ImNrMnBkZWV4bTAzNTMzY21vanV6dzljYXkifQ.H4z-JjsAeOy6XlUAygMlgg";
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-73.95,40.7],
zoom: 13
});
 
map.addControl(new MapboxDirections({
accessToken: mapboxgl.accessToken
}), 'top-left');

// Adding tile layer to the map
mapboxgl.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// Store API query variables
// var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// var date = "$where=created_date between'2016-01-10T12:00:00' and '2017-01-01T14:00:00'";
// var complaint = "&complaint_type=Rodent";
// var limit = "&$limit=10000";

// Assemble API query URL
var url = "/data";

// Grab the data with d3
// function buildmap(response){
d3.json(url, function(response) {

    // create a HTML element for each feature
    // var el = document.createElement('div');
    // el.className = 'marker';
  
    // // make a marker for each feature and add to the map
    // new mapboxgl.Marker(el)
    //   .setLngLat(marker.geometry.coordinates)
    //   .addTo(map);

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data Location property to a variable
    var Location = response[i].Location;

    // Check for Location property
    if (Location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([Location[0], Location[1]]));
        //.bindPopup(response[i].descriptor)
    }

  }

  // Add our marker cluster layer to the map
  //myMap.addLayer(markers);
  map.addLayer(markers);

});
// }
