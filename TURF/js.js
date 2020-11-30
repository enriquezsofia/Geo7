const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//MAP 1
  // draw a map of atlanta
  var map1 = L.map('map1').setView([-25.925694, 135.340366], 3);
  L.tileLayer(tilesProvider, {
    maxZoom: 17,
  }).addTo(map1);

  var polygon = turf.polygon([[
    [116, -36],
    [131, -32],
    [146, -43],
    [155, -25],
    [133, -9],
    [111, -22],
    [116, -36]
  ]]);
  
  var pointOnPolygon = turf.pointOnFeature(polygon);

  // display the bounding boxes on the map
  L.geoJSON(polygon, {color: "orange"}).addTo(map1);

  
//MAP 2
  var map2 = L.map('map2').setView([24.16651, -103.60040],4);
  L.tileLayer(tilesProvider, {
    maxZoom: 17,
  }).addTo(map2);

 //Turf Circle
 var turfCircle;
 var center = [-103.60040, 24.16651]; //al revés las coordenadas
 var radius = 800;
 var options = {steps: 16, units: 'kilometers'};  //Change steps to 4 to see what it does.
 var turfCircle = turf.circle(center, radius, options);
 L.geoJSON(turfCircle, {color:"pink"}).addTo(map2);


 //MAP 3
 var map3 = L.map('map3').setView([39.74467, -75.54580],8);
 L.tileLayer(tilesProvider, {
   maxZoom: 17,
 }).addTo(map3);

//Turf Circle
var features = turf.featureCollection([
    turf.point([-75.343, 39.984], {"name": "Location A"}),
    turf.point([-75.833, 39.284], {"name": "Location B"}),
    turf.point([-75.534, 39.123], {"name": "Location C"})
  ]);
  
  var enveloped = turf.envelope(features);
  L.geoJSON(features).addTo(map3);
L.geoJSON(enveloped, {color:"blue"}).addTo(map3);
