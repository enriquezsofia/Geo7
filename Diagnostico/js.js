function initMap() {
    var coordenadas = {
        lat: 28.3336001, lng: -81.7998059
    }

    var map = new google.maps.Map(
        document.getElementById('mapa'), {
            center: coordenadas,
            zoom: 10
        }
    );

        //ICONO
    var icono = {
        url: 'https://media.giphy.com/media/1ZweHMlSaxcc32mSSu/giphy.gif',
        scaledSize: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
    };

    //MARCADOR 
    var marker1 = new google.maps.Marker({
        position: { lat: 28.385233, lng: -81.563873 },
        icon: icono,
        map: map,
    });

    var marker2 = new google.maps.Marker({
        position: { lat: 28.3336001, lng: -81.7998059 },
        icon: icono,
        map: map,
    });

    var marker3 = new google.maps.Marker({
        position: { lat: 28.4720924, lng: -81.4757514 },
        icon: icono,
        map: map,
    });

    //INFOWINDOW
    var infowindow1 = new google.maps.InfoWindow({
        content: 'Walt Disney World'
    });

    var infowindow2 = new google.maps.InfoWindow({
        content: 'Space X'
    });

    var infowindow3 = new google.maps.InfoWindow({
        content: 'Hogwarts Castle'
    });

    //MARCADORES Y LOC
    marker1.addListener('click', function() {
        infowindow1.open(map, marker1);
    });

    marker1.addListener('click', function() {
        infowindow2.open(map, marker2);
    });

    marker3.addListener('click', function() {
        infowindow3.open(map, marker3);
    });

} 