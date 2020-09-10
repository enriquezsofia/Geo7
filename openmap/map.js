//const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tilesProvider = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';


let Mapview = L.map('Mapview').setView([21.152334, -101.7113132], 14);

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
  
  Mapview.on('dblclick', function (e) {
    if (allowedClicks < tot) {
      let latLng = Mapview.mouseEventToLatLng(e.originalEvent);
      console.log(latLng);
      L.marker([latLng.lat, latLng.lng], { icon: newIcon }).addTo(Mapview);
      let locs = [latLng.lat, latLng.lng];
      totMarks.push(locs);
      checkPoly();
      allowedClicks++;
    }
  });
  
  function checkPoly() {
    if (totMarks.length == tot) {
      var polygon = L.polygon(totMarks).addTo(Mapview);
    }
  }
  