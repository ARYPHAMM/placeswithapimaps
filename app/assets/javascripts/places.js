// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function initMap(lat, lng) {
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
        position: myCoords,
        map: map
    });
}
var newlat = 0;
var newlng = 0;
function initMap2(x,y) {
    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;
    if(x != " ")
    {
        var lat = x;
        var lng = y;
    }
    // if not defined create default position
    if (!lat || !lng){
        lat=10.80076;
        lng=106.679557;
        document.getElementById('place_latitude').value = lat;
        document.getElementById('place_longitude').value = lng;
    }
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map2'), mapOptions);
    var marker = new google.maps.Marker({
        position: myCoords,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true
    });
    // refresh marker position and recenter map on marker
    function refreshMarker(){
        var lat = document.getElementById('place_latitude').value;
        var lng = document.getElementById('place_longitude').value;
        var myCoords = new google.maps.LatLng(lat, lng);
        marker.setPosition(myCoords);
        map.setCenter(marker.getPosition());   
    }
    // when input values change call refreshMarker
    document.getElementById('place_latitude').onchange = refreshMarker;
    document.getElementById('place_longitude').onchange = refreshMarker;
    // when marker is dragged update input values
    marker.addListener('drag', function() {
        latlng = marker.getPosition();
        newlat=(Math.round(latlng.lat()*1000000))/1000000;
        newlng=(Math.round(latlng.lng()*1000000))/1000000;
          
        document.getElementById('place_latitude').value = newlat;
        document.getElementById('place_longitude').value = newlng;
    
 // var latlng = new google.maps.LatLng(newlat, newlng);
 //    var geocoder = new google.maps.Geocoder();
 //    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
 //        if (status != google.maps.GeocoderStatus.OK) {
 //           console(status);
 //        }
 //        // This is checking to see if the Geoeode Status is OK before proceeding
 //        if (status == google.maps.GeocoderStatus.OK) {
 //            console.log(results);
 //            var address = (results[0].formatted_address);
 //        }
 //    });
        $.ajax({
      url: "/places/changestatus",
      type: "post",
      dataType: "script",
      data: { maps: {"latitude": newlat, "longitude" : newlng}}
    });

 
  



    });
    // When drag ends, center (pan) the map on the marker position
    marker.addListener('dragend', function() {
        map.panTo(marker.getPosition());   
    });
        
    
}


