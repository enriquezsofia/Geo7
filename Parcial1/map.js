const tilesP = [
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
  'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png',
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
];

//MAPA DE LOS MARCADORES
let mapM = L.map('mapM').setView([21.152334, -101.7113132], 13);
//MAPA DE DONDE SE VERAN LOS POLIGONOS
let mapP = L.map('mapP').setView([21.152334, -101.7113132], 13);

let totMarks = [];
//let allowedClicks = 0;
let tot;

// document.getElementById('totMarker').addEventListener('change', function () {
//   console.log(tot);
//   tot = parseInt(document.getElementById('totMarker').value);
// });

L.tileLayer(tilesP[0], {
  maxZoom: 17,
}).addTo(mapM);

var newIcon = L.icon({
  iconUrl: 'ubicacion.png',
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [-3, -76],
});

mapM.doubleClickZoom.disable();
mapP.doubleClickZoom.disable();

mapM.on('dblclick', function (e) {

    let latLng = mapM.mouseEventToLatLng(e.originalEvent);
    console.log(latLng);
    L.marker([latLng.lat, latLng.lng], { icon: newIcon }).addTo(mapM);
    let locs = [latLng.lat, latLng.lng];
    totMarks.push(locs);
    checkPoly();
});

function checkPoly() {
  if (totMarks.length === 11) {
    L.tileLayer(tilesP[Math.floor(Math.random() * tilesP.length) + 1], {
      maxZoom: 17,
    }).addTo(mapM);

    L.polygon(totMarks).addTo(mapM);

    totMarks.forEach((el) => {
      //console.log(el);
      L.marker([el[0], el[1]], { icon: newIcon }).addTo(mapP);
    });

    mostrarAlerta();
    //Inicializacion de segundo mapa
    L.tileLayer(tilesP[Math.floor(Math.random() * tilesP.length) + 1], {
      maxZoom: 17,
    }).addTo(mapP);
  }
  // if (totMarks.length === tot) {
  //   // L.polygon(totMarks).addTo(mapM);
  //   // L.polygon(totMarks).addTo(mapP);
  //   //const randomElement = array[Math.floor(Math.random() * array.length)];
  //   //let randN = tilesP[Math.floor(Math.random() * tilesP.length)]

  //   totMarks.forEach((el) => {
  //     //console.log(el);
  //     L.marker([el[0], el[1]], { icon: newIcon }).addTo(mapP);
  //   });

  //   mostrarAlerta();
  //   //Inicializacion de segundo mapa
  //   L.tileLayer(tilesP[Math.floor(Math.random() * tilesP.length) + 1], {
  //     maxZoom: 17,
  //   }).addTo(mapP);

  // }
}

var htmlTable = '';
var tdCoord= '';
function hacerTabla(){
  var id= 1;
  totMarks.forEach(coord => {
    console.log('micoord', coord);
    tdCoord=`<td>${coord[0]}</td><td>${coord[1]}</td>`;
    htmlTable += `<tr><th scope="row">${id}</th>${tdCoord}</tr>`;
    id++;
  });
}

function mostrarAlerta(){
  hacerTabla();

  Swal.fire({
    title: 'Coordenadas',
    html: `<table class="table table-sm">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Latitud</th>
        <th scope="col">Longitud</th>
      </tr>
    </thead>
    <tbody>
      ${htmlTable}
    </tbody>
  </table>`,
    width: 600,
    padding: '3em',
    background: '#fff url("https://sweetalert2.github.io/images/trees.png")',
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `
  })
}