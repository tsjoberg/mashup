$( function() {

    map = new GMaps({
        div: '#map-canvas',
        lat: 40.7658914,
        lng: -73.9614134,
        enableNewStyle: true
    });

    GMaps.geolocate({
      success: function(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude);
      },
      error: function(error) {
        alert('Geolocation failed - using default NYC location: '+ error.message);
      },
      not_supported: function() {
        alert("Your browser does not support geolocation");
      }
    });

    map.addLayer('transit');

    $.getJSON("http://bustime.mta.info/api/where/stops-for-location.json?radius=100&lat=40.7658914&lon=-73.9614134&latSpan=0.005&lonSpan=0.005&key=791cb5ed-0cd7-44af-96b0-91fa6d781095&callback=?", function(data){
        var markers = [];
        var items = data.data.stops;
        console.log(items);
        for (i=0; i < items.length; i++){
            markers.push({
                lat: items[i].lat,
                lng: items[i].lon,
                title: items[i].name,
                infoWindow: {
                    content: "<h1>" + items[i].name + "</h1>"
                }
            });
        }

        console.log(markers);

        map.addMarkers(markers);
    });


});