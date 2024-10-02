var geocoder;
var _map;
var marker;
var _address;
var _location = [];
$(document).ready(function () {
    var lat = '10.849975351131153';
    var long = '106.61510917532348';
    initMap(lat, long);
    searchmaps();
    loaddatalocation();
});

function loaddatalocation() {
    var data = $('#Location').val();
    if (data != null && data != undefined && data.length > 0) {
        _location = JSON.parse(data);
        loadlocation();
    }
}

function searchmaps() {
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    _map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    _map.addListener('bounds_changed', function () {
        searchBox.setBounds(_map.getBounds());
    });
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        clearMarkers();
        
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        console.log(places);
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            geocoderMarker(place.geometry.location.lat(), place.geometry.location.lng());

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        _map.fitBounds(bounds);
    });
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
		zoom: 5,
		center: { lat: lat, lng: long }
	});
    geocoderMarker(lat, long);
}

function geocoderMarker(lat, long) {
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var latlng = { lat: lat, lng: long };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                marker = new google.maps.Marker({
                    map: _map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: latlng,
                });
                _map.zoom = 5;
                _address = results[0].formatted_address;
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(_map, marker);
                marker.addListener('dragend', toggleBounce);
            }
        }
    })
}

function clearMarkers() {
    marker.setMap(null);
    marker = [];
    _address = '';
}

function toggleBounce() {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	}

	var latStr = this.position.lat();
	var lngStr = this.position.lng();

	$('#lat').html(latStr);
    $('#long').html(lngStr);
    clearMarkers();
    geocoderMarker(latStr, lngStr);
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

$(document).on('click', '.btn-add-location', function () {
    var $lat = marker.position.lat();
    var $log = marker.position.lng();
    var check = false;
    _location.forEach(function (i) {
        if (i.Lat == $lat && i.Log == $log) {
            check = true;
        }
    })
    if (!check) {
        _location.push({ Id: guid(), Lat: $lat, Log: $log, Address: _address })
        loadlocation();
    }
    else {
        alert("Location exits");
    }
});

$(document).on('click', '.delete-maps', function () {
    var keyid = $(this).data('id');
    if (keyid != undefined && keyid.length > 0) {
        _location.forEach(function (i) {
            if (i.Id == keyid) {
                _location.splice(i, 1);
            }
        })
    }
    loadlocation();
});

$(document).on('click', '.save-maps-location', function () {
    var postData = { Id: $('#Id').val(), IsActive: $('#IsActive').is(":checked"), Location: JSON.stringify(_location) };
    addAntiForgeryToken(postData);
    $.ajax({
        cache: false,
        type: 'POST',
        url: '/Admin/Maps/SaveMaps',
        data: postData,
        dataType: 'json',
        success: function (datas) {
            if (datas > 0) {
                MsgSuccess('Thông báo', 'Cập nhật thành công', 3000);
            }
            else MsgDanger('Thông báo', 'Lỗi cập nhật tin', 3000);
        },
        failure: function (message) {
            MsgDanger('Thông báo', 'Lỗi cập nhật tin', 3000);
            console.log("Error:" + message);
        }
    });
});

function loadlocation() {
    var $list = $('.list-maps-location').empty();
    if (_location.length > 0) {
        _location.forEach(function (i) {
            $list.append("<li class='" + i.Id + " margin-t-5'>" + i.Address + "<button class='btn bg-red btn-sm delete-maps' data-id='" + i.Id + "'><i class='fa fa-trash-o'></i>Delete</button></li>")
        });
    }
}

function geocoding(address) {
	var position = [];
	//alert(address);
	geocoder = new google.maps.Geocoder();
	//address = document.getElementById("addressinput").value;
	if (address == '' || address == null)
		address = "Bình Định Việt Nam";
	geocoder.geocode({ 'address': address }, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			_map.setCenter(results[0].geometry.location);

			marker = new google.maps.Marker({
				map: _map,
				draggable: true,
				animation: google.maps.Animation.DROP,
				position: results[0].geometry.location
			});
			marker.addListener('click', toggleBounce);

			var latStr = results[0].geometry.location.lat();
			var lngStr = results[0].geometry.location.lng();

			$('#hidden-lat').val(latStr);
			$('#hidden-lng').val(lngStr);
		} else {
			//alert("Geocode was not successful for the following reason: " + status);
		}
	});
	return position;
};

function reverseGeocoding(latStr, lngStr) {
	geocoder = new google.maps.Geocoder;
	var infowindow = new google.maps.InfoWindow;

	var latlng = { lat: parseFloat(latStr), lng: parseFloat(lngStr) };
	geocoder.geocode({ 'location': latlng }, function (results, status) {
		if (status === 'OK') {
			if (results[1]) {
				_map.setZoom(5);

				marker.setMap(null);
				marker = new google.maps.Marker({
					map: _map,
					draggable: true,
					animation: google.maps.Animation.DROP,
					position: { lat: 10.793345, lng: 106.68207699999994 }
				});
				marker.addListener('dragend', toggleBounce);

				infowindow.setContent(results[1].formatted_address);
				infowindow.open(_map, marker);
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
};

function filladressauto() {
    var address = "";
    var soduong = '';
    var phuongxa = '';
    var quanhuyen = '';
    var tinhthanh = '';
	var quocgia = 'Việt Nam', $province = $("#ProvinceId option:selected"), $district = $("#DistrictId option:selected");
	if ($district.val() != '') {
		quanhuyen = $district.text();
	}
	if ($province.val() != '') {
        tinhthanh = quocgia + " " + $province.text();
	}
        address = quanhuyen + " " + tinhthanh ;

        var latitude = '';
        var longitude = '';
        if (address.trim != ' ') {
            $.trim(address);
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    latitude = results[0].geometry.location.lat();
                    longitude = results[0].geometry.location.lng();
                    initMap(latitude, longitude);
                    return;
                }
            });
        }
        initMap(latitude, longitude);
    }
