var geocoder;
var _map;
var marker = [];
var _address;
var _location = [];
$(document).ready(function () {
    var lat = '10.849975351131153';
    var long = '106.61510917532348';
    loaddatalocation();
    initMap(lat, long);
});

function loaddatalocation() {
    var data = $('#Location').val();
    if (data != null && data != undefined && data.length > 0) {
        _location = JSON.parse(data);
    }
}

function initMap(lat, long) {
	var latDefault = 10.774121190636265;
	var longDefault = 106.6950374339599;
	if (lat == '' || long == '') {
		long = longDefault;
		lat = latDefault;
	} else {
		lat = parseFloat(lat);
		long = parseFloat(long);
    }
    
	_map = new google.maps.Map(document.getElementById('map-api'), {
		zoom: 14,
		center: { lat: lat, lng: long }
    });
    if (_location != undefined && _location != null && _location.length > 0) {
        _location.forEach(function (i) {
            geocoderMarker(parseFloat(i.Lat), parseFloat(i.Log), i.Address);
        })
    }
}

function geocoderMarker(lat, long, address) {
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var latlng = { lat: lat, lng: long };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                var mk = new google.maps.Marker({
                    map: _map,
                    animation: google.maps.Animation.DROP,
                    position: latlng,
                });
                marker.push(mk);
                _map.zoom = 14;
                _address = results[0].formatted_address;
                if (address != '' && address != undefined)
                    _address = address
                else
                    _address = results[0].formatted_address;
                infowindow.setContent(_address);
                infowindow.open(_map, mk);
            }
        }
    })
}

