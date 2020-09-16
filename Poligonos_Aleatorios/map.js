//const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const tilesProvider = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
const tilesProvider = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';


let Mapview = L.map('Mapview').setView([21.152334, -101.7113132], 5);

let totMarks = [];
let allowedClicks = 0;
let tot = 0;

document.getElementById('totMarker').addEventListener('change', function () {
  console.log(tot);
  tot = parseInt(document.getElementById('totMarker').value);
});

L.tileLayer(tilesProvider, {
  maxZoom: 17,
}).addTo(Mapview);

var newIcon = L.icon({
    iconUrl: 'ubicacion.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [-3, -76],
  });
  
  Mapview.doubleClickZoom.disable();
  
  
  
  function makePolygon() {
    tot = parseInt(document.getElementById('totMarker').value);
    for(var i = 0; i < tot;i++){
      var lat = Math.floor((Math.random() * 10) + 1 + 21.152334);
      var lng = Math.floor((Math.random() * 10) + 1 - 101.7113132);
      L.marker([lat, lng], { icon: newIcon }).addTo(Mapview);
      let locs = [lat, lng];
      totMarks.push(locs);
    }
    var polygon = L.polygon(totMarks).addTo(Mapview);

  }
  