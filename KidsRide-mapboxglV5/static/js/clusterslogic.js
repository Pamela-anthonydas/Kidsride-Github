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


// Creating dance, music and sports icons to add the map
var danceIcon = new L.Icon({
  //iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconUrl:'http://www.clker.com/cliparts/9/c/E/w/X/r/ballerina-purple-hi.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [40, 60],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var musicIcon = new L.Icon({
  //iconUrl: 'static/images/music2.png',
  iconUrl:'http://www.clker.com/cliparts/6/4/1/8/1206581728647714433papapishu_guitar_5.svg.hi.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
   iconSize: [30, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var sportsIcon = new L.Icon({
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

  // Create  new marker cluster groups
  var markers = L.markerClusterGroup();
  var dmarkers = L.markerClusterGroup();
  var mmarkers = L.markerClusterGroup();
  var smarkers = L.markerClusterGroup();

 // An array which will be used to store created Markers for each group
  var danceMarkers = [];
  var musicMarkers = [];
  var sportsMarkers = [];
  var allMarkers = [];



// Loop through data array  to create  new markers, push it to the danceMarkers,musicMarkers,sportsMarkers arrays.
//Add all the Markers to a new layer group. Pass overlay maps into control layer and render on map.
  for (var i = 0; i < response.length; i++) {
    // Set the data location property to a variable
    var location = response[i].location;
    // Set the data category (type) property to a variable
    var cat = response[i].type;
    // For record of type "Dance Classes" , create location markers
    if(cat==="Dance Classes"){
        // Check for location property
      if (location) {
          // loop through the data array, create a new marker, push it to the danceMarkers array
          danceMarkers.push(
            L.marker((response[i].location),{icon: danceIcon})
            .bindPopup("<h2>" +"<a href='" + response[i].url + "' target='_blank'>" + response[i].name + "</a>"+ "</h2>"+"<br>"+"<h4>" + response[i].address+"</h4>"+"<br>"+"<h4>" + response[i].phoneNo+"</h4>")
                     //dmarkers.addLayer(L.marker([location[0], location[1]],{icon: danceIcon})
           //.bindPopup(response[i].name,response[i].address))
          );
        var danceLayer = L.layerGroup(danceMarkers);
        var overlayMaps = {
          Dance: danceLayer};
       
      }
    }
    // For record of type "Music Classes" , create location markers
    else if(cat==="Music Classes"){
       // Check for location property
        if (location) {
          // loop through the data array, create a new marker, push it to the musicMarkers array
          musicMarkers.push(
          L.marker((response[i].location),{icon: musicIcon})
          .bindPopup("<h2>" +"<a href='" + response[i].url + "' target='_blank'>" + response[i].name + "</a>"+ "</h2>"+"<br>"+"<h4>" + response[i].address+"</h4>"+"<br>"+"<h4>" + response[i].phoneNo+"</h4>")
                   //mmarkers.addLayer(L.marker([location[0], location[1]],{icon: musicIcon})
         //.bindPopup(response[i].name,response[i].address))
        );
        var musicLayer = L.layerGroup(musicMarkers);
        var overlayMaps = {
          Dance: danceLayer,
          Music:musicLayer};
        }
    }
    // For record of type "Sports Classes" , create location markers
    else if(cat==="Sports Classes") {
        if (location) {
          // loop through the data array, create a new marker, push it to the sportsMarkers array
          sportsMarkers.push(
            L.marker((response[i].location),{icon: sportsIcon})
            .bindPopup("<h2>" +"<a href='" + response[i].url + "' target='_blank'>" + response[i].name + "</a>"+ "</h2>"+"<br>"+"<h4>" + response[i].address+"</h4>"+"<br>"+"<h4>" + response[i].phoneNo+"</h4>")
                    //smarkers.addLayer(L.marker([location[0], location[1]],{icon: sportsIcon})
           //.bindPopup(response[i].name,response[i].address))
          );

          var sportsLayer = L.layerGroup(sportsMarkers);
          var overlayMaps = {
            Dance: danceLayer,
            Music:musicLayer,
            Sports:sportsLayer};
        }

    }
  }
 // Pass overlay maps into control layer and render on map.
  L.control.layers(null, overlayMaps).addTo(myMap);

  // Loop through data array  to create  new marker, push it to the AllMarkers array.
//Add all the Markers to a new layer group. Pass overlay maps into control layer and render on map.
for (var i = 0; i < response.length; i++) {

  // Set the data location property to a variable
  var location = response[i].location;
  var cat = response[i].type;
  if(cat==="Dance Classes"){
    if (location) {
      allMarkers.push(
                 markers.addLayer(L.marker([location[0], location[1]],{icon: danceIcon})
      //  .bindPopup("<h2>" + response[i].name + "</h2>"+'</br>' +"<h4>" + response[i].address+"<h4>" )
       //.bindPopup( '<a href=www.yelp.com"' + response[i].url + '" target="_blank">' + response[i].name + '</a>' )
       //.bindPopup("<a href=" + response[i].url + ">" + response[i].name + "</a>")
       .bindPopup("<h2>" +"<a href='" + response[i].url + "' target='_blank'>" + response[i].name + "</a>"+ "</h2>"+"<br>"+"<h4>" + response[i].address+"</h4>"+"<br>"+"<h4>" + response[i].phoneNo+"</h4>")
      ));
    var allLayer = L.layerGroup(allMarkers);
    var overlayMaps1 = {
      All: allLayer };
    
    }
  }
  else if(cat==="Music Classes"){
    if (location) {
        allMarkers.push(
                   markers.addLayer(L.marker([location[0], location[1]],{icon: musicIcon})
         //.bindPopup("<h2>" + response[i].name + "</h2>"+'</br>' +"<h4>" + response[i].address+"<h4>" )
         .bindPopup("<h2>" +"<a href='" + response[i].url + "' target='_blank'>" + response[i].name + "</a>"+ "</h2>"+"<br>"+"<h4>" + response[i].address+"</h4>"+"<br>"+"<h4>" + response[i].phoneNo+"</h4>")
        ));
      var allLayer = L.layerGroup(allMarkers);
      var overlayMaps1 = {
        All: allLayer };
      
    }
}
else if(cat==="Sports Classes"){
  if (location) {
      allMarkers.push(
                 markers.addLayer(L.marker([location[0], location[1]],{icon: sportsIcon})
       //.bindPopup("<h2>" + response[i].name + "</h2>"+'</br>' +"<h4>" + response[i].address+"<h4>" )
       .bindPopup("<h2>" +"<a href='" + response[i].url + "' target='_blank'>" + response[i].name + "</a>"+ "</h2>"+"<br>"+"<h4>" + response[i].address+"</h4>"+"<br>"+"<h4>" + response[i].phoneNo+"</h4>")
      ));
    var allLayer = L.layerGroup(allMarkers);
    var overlayMaps1 = {
      All: allLayer };
    
  }
}
}
L.control.layers(null, overlayMaps1).addTo(myMap);


});
