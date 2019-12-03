// Creating map object
mapboxgl.accessToken = API_KEY;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-73.95,40.7],
zoom: 13
});
 
map.addControl(new MapboxDirections({
accessToken: mapboxgl.accessToken
}), 'top-left');

// Assemble API query URL
var url = "/data";

// Grab the data with d3
d3.json(url, function(response) {

        //create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        for (var i = 0; i < response.length; i++) {

          var el = document.createElement('div');
          el.className = 'marker';
      
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(response[i].location)
          .addTo(map);
        }

});

