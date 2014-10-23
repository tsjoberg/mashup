$( function() {

    var lat = 40.7658914;
    var lng = -73.9614134;

    function getBusStops(vlat, vlng){
        $.getJSON("http://bustime.mta.info/api/where/stops-for-location.json?radius=200&lat=" + vlat + "&lon=" + vlng + "&latSpan=0.005&lonSpan=0.005&key=791cb5ed-0cd7-44af-96b0-91fa6d781095&callback=?", function(data){
            var markers = [];
            var items = data.data.stops;

            for (i=0; i < items.length; i++){
                markers.push({
                    lat: items[i].lat,
                    lng: items[i].lon,
                    title: items[i].name,
                    infoWindow: {
                        content: "<h4>" + items[i].name + "</h4>"
                    }
                });
            }

            map.addMarkers(markers);
        });
    };

    map = new GMaps({
        div: '#map-canvas',
        lat: lat,
        lng: lng,
        enableNewStyle: true
    });

    //map.addLayer('transit');

    GMaps.geolocate({
      success: function(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude);
        getBusStops(position.coords.latitude, position.coords.longitude);
      },
      error: function(error) {
        alert('Geolocation failed - using default NYC location: '+ error.message);
        getBusStops(lat, lng);
      },
      not_supported: function() {
        alert("Your browser does not support geolocation");
      }
    });

    

});