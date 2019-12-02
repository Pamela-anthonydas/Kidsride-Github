// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);



var greenIcon = new L.Icon({
  //iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconUrl:'http://www.clker.com/cliparts/9/c/E/w/X/r/ballerina-purple-hi.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [40, 60],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var RedIcon = new L.Icon({
  //iconUrl: 'static/images/music2.png',
  iconUrl:'http://www.clker.com/cliparts/6/4/1/8/1206581728647714433papapishu_guitar_5.svg.hi.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
   iconSize: [30, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//L.AwesomeMarkers.Icon.prototype.options.prefix = 'ion';
// var RedIcon = L.AwesomeMarkers.Icon({
//   icon: 'music',
//   markerColor: 'red'
// });

var BlueIcon = new L.Icon({
  //iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconUrl:'http://www.clker.com/cliparts/d/1/4/6/11971185311926706097Gioppino_Basketball.svg.hi.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// Assemble API query URL
var url = "/data";

// Grab the data with d3
d3.json(url, function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  console.log(response)
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].location;

    var cat = response[i].type;

    if(cat==="Dance Classes"){

    // Check for location property
      if (location) {

        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location[0], location[1]],{icon: greenIcon})
          .bindPopup(response[i].name,response[i].address));
      }
    }

    else if(cat==="Music Classes"){

      // Check for location property
        if (location) {
  
          // Add a new marker to the cluster group and bind a pop-up
        //   markers.addLayer(L.marker([location[0], location[1]],{
        //     icon: L.AwesomeMarkers.icon({
        //         icon: 'help-buoy',
        //         markerColor: 'red'
        //     })
        // })
        //     .bindPopup(response[i].name,response[i].address));
        markers.addLayer(L.marker([location[0], location[1]],{icon: RedIcon})
        .bindPopup(response[i].name,response[i].address));
        }
      }

    else {
      if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location[0], location[1]],{icon: BlueIcon})
          .bindPopup(response[i].name,response[i].address));
      }

    }

    

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
