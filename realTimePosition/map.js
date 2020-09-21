//const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const tilesProvider = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';


// Initialize Global Variables

document.getElementById('locationForm').hidden = true;

// Initialize LEAFLET
const tilesProvider = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
var newIcon = L.icon({
  iconUrl: 'ubicacion.png',
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [-3, -76],
});
let Mapview = L.map('Mapview').setView([21.1261027, -101.6814307], 12);
L.tileLayer(tilesProvider, {maxZoom: 18 }).addTo(Mapview);
Mapview.doubleClickZoom.disable();

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBph1eNt1PZaAkJs9XXLjqSiJUkXZmD8X8",
  authDomain: "project-66978.firebaseapp.com",
  databaseURL: "https://project-66978.firebaseio.com",
  projectId: "project-66978",
  storageBucket: "project-66978.appspot.com",
  messagingSenderId: "36034094216",
  appId: "1:36034094216:web:950f5d4e2b0c550eed6b3d"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var newLocationRef = db.collection("ubicacion_tiempo_real").doc();
// Initialize APP



// Function Globals
getLocation();
readAllLocations();

// Function Firebase INIT

function addToFirebaseDB(lat_long){
  newLocationRef.set({ lat_long });
}

function readAllLocations(){
  db.collection("ubicacion_tiempo_real").onSnapshot(snapshot => {
    if (snapshot.size) {
      // we have something
      snapshot.forEach(doc =>
        this.L.marker([doc.data().lat_long.lat, doc.data().lat_long.long], { icon: this.newIcon }).addTo(Mapview)
      )
    } else {
      
    }
  })
}


// Function Firebase END

// Function GetCurrentPosition INIT


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition, showError);
    
  } else { 
    document.getElementById('locationForm').hidden = false;
  }
}

function showPosition(position) {
  let latlong = {
    lat: position.coords.latitude,
    long: position.coords.longitude
  }; 
  this.L.marker([position.coords.latitude, position.coords.longitude], { icon: newIcon }).addTo(Mapview);
  addToFirebaseDB(latlong);
}

function showError(error) {
  console.warn(error);
  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById('locationForm').hidden = false;
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

//Function getCurrentPosition END


  