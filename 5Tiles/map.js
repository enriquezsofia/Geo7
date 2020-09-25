let map = L.map('map').setView([37.8, -96], 4);
map.doubleClickZoom.disable();

var totMarks = 0;
changeIcon = false;

const tilesP = {
    t0: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    t1: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
    t2: 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png',
    t3: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    t4: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    t5: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
};

L.tileLayer(tilesP.t0, {
  maxZoom: 17,
}).addTo(map);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function mapTileChange() {
    var x = document.getElementById("mySelect").value;
    L.tileLayer(tilesP[x], {
        maxZoom: 17,
    }).addTo(map);
}

var newIcon = L.icon({
    iconUrl: 'pin1.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [-3, -76],
  });

map.on('dblclick', function (e) {
    let latLng = map.mouseEventToLatLng(e.originalEvent);
    console.log(latLng);
    L.marker([latLng.lat, latLng.lng], { icon: newIcon }).addTo(map);
    totMarks++
    console.log(`Total de marcadores: ${totMarks}`);
    eachThree(totMarks);
});

function eachThree(number) {
    if(number % 3 == 0) {
        changeIcon = !changeIcon;
        console.log(changeIcon);
    }
    if(changeIcon){
        newIcon.options.iconUrl = "pin2.png";
    } else {
        newIcon.options.iconUrl = "pin1.png";
    }
}

function resetMap(){
    document.location.reload();
}