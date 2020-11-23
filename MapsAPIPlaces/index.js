var map;
var service;
var infowindow;

var coordenadas = {
    lat : 21.152702,
    lng : -101.71183
}

let googleGeoURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
let termino = "hoteles";
let ubicacion = "&location=21.152702,-101.711838&radius=5000";
let APIKEY = '&key=' + 'AIzaSyDFdVmWF1R-aoTVNYRP-kwhoYuWkeJuiFw'

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: coordenadas,
    mapTypeId: "terrain",
  });

  infowindow = new google.maps.InfoWindow();

  var request = {
    type: 'restaurant',
    radius: 500,
    location: coordenadas
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }


function createMarker(place) {
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
    google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name);
      infowindow.open(map);
    });
}