//const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const tilesProvider = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
const tilesProvider = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
var firebaseConfig = {
  apiKey: "AIzaSyBph1eNt1PZaAkJs9XXLjqSiJUkXZmD8X8",
  authDomain: "project-66978.firebaseapp.com",
  databaseURL: "https://project-66978.firebaseio.com",
  projectId: "project-66978",
  storageBucket: "project-66978.appspot.com",
  messagingSenderId: "36034094216",
  appId: "1:36034094216:web:950f5d4e2b0c550eed6b3d"
};
var newIcon = L.icon({
  iconUrl: 'ubicacion.png',
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [-3, -76],
});
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

let Mapview = L.map('Mapview').setView([21.152334, -101.7113132], 14);

let totMarks = [];
let allowedClicks = 0;
let tot = 0;

document.getElementById('totMarker').addEventListener('change', function () {
  
  tot = parseInt(document.getElementById('totMarker').value);
  if(tot % 2 == 0){
    newIcon = L.icon({
      iconUrl: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      iconSize: [60, 60],
      iconAnchor: [30, 60],
      popupAnchor: [-3, -76],
    });
  }
});

L.tileLayer(tilesProvider, {
  maxZoom: 17,
}).addTo(Mapview);


  
  
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
      addToFirebaseDB(totMarks);
      //addToFirebaseDB(polygon);
    }
  }

  function addToFirebaseDB(polygon){
    console.warn(polygon)
    var newPolygonRef = db.collection("poligonos").doc();
    newPolygonRef.set({ latlong: JSON.stringify(polygon)});
    
  }
  